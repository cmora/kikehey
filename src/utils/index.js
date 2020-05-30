import flatten from 'lodash/flatten';
import isArray from 'lodash/isArray';

export const camelize = (str) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index == 0 ? match.toLowerCase() : match.toUpperCase();
  });
};

export const slugify = (text) => {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

export const getProjectIDbySlug = (projects, slug) => {
  if (isArray(projects) && projects.length === 0) return null;
  let projectID = null;
  const flattenProjects = flatten(projects);
  flattenProjects.map((item) => {
    const { slug: projectSlug } = item;
    if (projectSlug === slug) {
      projectID = item.id;
    }
  });
  return projectID;
};
