import objectToFormData from "./objectToFormData";

const preventRepresentationCache = ({ method, url }) =>
	method.toUpperCase() != "GET" || /^(https?:)?\/\//.test(url)
		? url
		: [url, `_xhr_${Date.now()}=1`].join(url.indexOf("?") > -1 ? "&" : "?");

const jsonify = callback => data => callback(data && JSON.parse(data));

const recipes = {
	json: ({ params, success, headers, ...options }) => ({
		...options,
		url: preventRepresentationCache(options),
		params: params && JSON.stringify(params),
		success: jsonify(success),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			...headers
		}
	}),

	jsonUpload: ({ params, success, headers, ...options }) => ({
		...options,
		params: objectToFormData(params),
		success: jsonify(success),
		headers: {
			Accept: "application/json",
			...headers
		}
	})
};

const cook = recipe =>
	recipes[recipe] ||
	(() => {
		if (recipe)
			console.warn(`Invalid ajax recipe: ${recipe}. Falling back to null`);
		return options => options;
	})();

const ajax = ({ recipe = "json", ...options }) => {
	const xhr = new XMLHttpRequest();
	const { method, url, params, success, failure, headers = {} } = cook(recipe)(
		options
	);

	headers["X-Requested-With"] = "XMLHttpRequest";

	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4)
			if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304)
				success(xhr.responseText);
			else if (failure) failure(xhr);
	};

	xhr.open(method.toUpperCase(), url);

	Object.keys(headers).forEach(header =>
		xhr.setRequestHeader(header, headers[header])
	);

	xhr.send(params || null); // Avoid IE sending "undefined" as the body
};

const methodsWithoutParams = ["get", "delete"];
const methodsWithParams = ["post", "put", "patch"];

export const createMethods = ajax => {
	methodsWithoutParams.forEach(
		method =>
			(ajax[method] = (url, success, failure, options) =>
				ajax({ method, url, success, failure, ...options }))
	);

	methodsWithParams.forEach(
		method =>
			(ajax[method] = (url, params, success, failure, options) =>
				ajax({ method, url, params, success, failure, ...options }))
	);
};

createMethods(ajax);

export default ajax;
