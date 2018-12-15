import { get, orderBy, groupBy } from 'lodash';
import { slugify } from '../utils';

const formatExperienceDate = (date) => {
    if (!date) return null;

    const newDate = new Date(date);
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JULY', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    return `${months[newDate.getMonth()]} ${newDate.getFullYear()}`;
};

export const formatMenu = (data) => {
    const menu = [];
    data.map((item) => {
        menu.push({
            name: get(item, 'fields.menuName'),
            slug: get(item, 'fields.slug'),
            order: get(item, 'fields.order')
        });
    });
    return orderBy(menu, ['order']);
};

export const formatSection = (data) => {
    return {
        title: get(data, 'fields.title', null),
        description: get(data, 'fields.description', null),
        body: get(data, 'fields.body', null),
        resume: get(data, 'fields.resume.fields.file.url', null)
    };
};

export const formatExperience = (data) => {
    const experience = [];
    const dataOrdered = orderBy(data, ['fields.startDate'], ['desc']);
    dataOrdered.map((item) => {
        experience.push({
            company: get(item, 'fields.company'),
            companyLogo: get(item, 'fields.companyLogo.fields.file.url'),
            description: get(item, 'fields.description'),
            role: get(item, 'fields.role'),
            startDate: formatExperienceDate(get(item, 'fields.startDate')),
            endDate: formatExperienceDate(get(item, 'fields.endDate'))
        });
    });
    return experience;
};

export const formatProjects = (data) => {
    const projects = [];
    data.map((item) => {
        projects.push(formatProject(item));
    });
    return orderBy(groupBy(projects, 'category.name'), (elem) => {
        return elem[0].category.order;
    });
};

export const formatProject = (data) => {
    return {
        company: get(data, 'fields.company'),
        image: get(data, 'fields.image.fields.file.url'),
        thumbnail: get(data, 'fields.thumbnail.fields.file.url'),
        title: get(data, 'fields.title'),
        url: get(data, 'fields.url'),
        category: {
            name: get(data, 'fields.category.fields.name'),
            order: get(data, 'fields.category.fields.order'),
            description: get(data, 'fields.category.fields.description')
        },
        slug: slugify(get(data, 'fields.title')),
        id: get(data, 'sys.id'),
        body: get(data, 'fields.body')
    };
};

export const formatSocial = (data) => {
    const social = [];
    data.map((item) => {
        social.push({
            name: get(item, 'fields.socialNetwork'),
            url: get(item, 'fields.url')
        });
    });
    return social;
};