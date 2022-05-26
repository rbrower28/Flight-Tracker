

// Renders a list with a template and single item templating function
// Makes a whole list
export function renderListWithTemplate(template, parentElement, list, callback) {
    list.forEach(item => {
      const clone = template.content.cloneNode(true);
      const doneTemplate = callback(clone, item);
      parentElement.appendChild(doneTemplate);
    })
  }