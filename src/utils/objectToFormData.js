const objectToFormData = (obj, formData = new FormData(), namespace) => {
	Object.keys(obj).forEach(key => {
		const val = obj[key];
		if (val == null) return;

		const field = Array.isArray(obj) ? "" : key;
		const name = namespace ? `${namespace}[${field}]` : field;

		if (val instanceof Blob) formData.append(name, val, val.name);
		else if (typeof val == "object") objectToFormData(val, formData, name);
		else formData.append(name, val);
	});

	return formData;
};

export default objectToFormData;
