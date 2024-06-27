type Attributes = {
    'id': string,
    'data-json': string,
}

const createTemplate = (html:string, attributes:Attributes):HTMLTemplateElement => {
  const template = document.createElement('template');
  const attributeNames = Object.keys(attributes);
  attributeNames.forEach((key) => {
    template.setAttribute(key, attributes[key as keyof Attributes]);
  })
  template.innerHTML = html;

  return template;
}



export default createTemplate;