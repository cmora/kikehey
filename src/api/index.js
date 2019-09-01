import * as contentful from 'contentful';

const client = contentful.createClient({
  space: "z5y7tjlur821",
  accessToken: "a8cb4b52af3bd8f2024490ffd96bea6c3b6d8d1d34dc946e0d95155f79e11900",
});

export const getMenu = () => {
  return client.getEntries({
    'content_type': 'menu',
  });
};

export const getSections = () => {
  return client.getEntries({
    'content_type': 'sections',
  });
};

export const getExperience = () => {
  return client.getEntries({
    'content_type': 'experience',
  });
};

export const getProjects = () => {
  return client.getEntries({
    'content_type': 'projects',
  });
};

export const getProject = (id) => {
  return client.getEntry(id);
};

export const getSocial = () => {
  return client.getEntries({
    'content_type': 'socialNetworks',
  });
};
