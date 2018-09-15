/**
 * Created on 15-Sep-18.
 */
const getNextPageUrl = response => {
  const link = response.headers.link;
  if (!link) {
    return null;
  }

  const nextLink = link.split(',').find(s => s.indexOf('rel="next"') > -1);
  if (!nextLink) {
    return null;
  }

  return nextLink.trim().split(';')[0].slice(1, -1);
};

export default getNextPageUrl;
