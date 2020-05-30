import flatten from 'lodash/flatten';
import isArray from 'lodash/isArray';
import meta, { SITE_URL } from '../config';

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

export const getMetaTags = (data, pathname) => {
  const { title, description, image } = data;
  const metaTags = [
    { itemprop: 'name', content: title || meta.title },
    { itemprop: 'description', content: description || meta.description },
    { itemprop: 'image', content: image || meta.image },
    { name: 'description', content: description || meta.description },
    { name: 'keywords', content: meta.meta.name.keywords },
    { property: 'og:title', content: title || meta.title },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: SITE_URL + pathname },
    { property: 'og:image', content: image || meta.image },
    { property: 'og:description', content: description || meta.description },
    { property: 'og:site_name', content: title || meta.title },
  ];
  return metaTags;
};
