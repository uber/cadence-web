// import Regexp from 'path-to-regexp';
// import { pushState } from '../util/push-state'; // TODO
// import { saveScrollPosition } from './scroll'; // TODO
// import { genStateKey, setStateKey, getStateKey } from './state-key'; // TODO
// import { handleScroll } from '../util/scroll' // TODO

// const regexpCompileCache = Object.create(null);

// function pushState (url, replace) {
//   saveScrollPosition();
//   // try...catch the pushState call to get around Safari
//   // DOM Exception 18 where it limits to 100 pushState calls
//   const history = window.history;
//   try {
//     if (replace) {
//       // preserve existing history state as it could be overriden by the user
//       const stateCopy = extend({}, history.state);
//       stateCopy.key = getStateKey();
//       history.replaceState(stateCopy, '', url);
//     } else {
//       history.pushState({ key: setStateKey(genStateKey()) }, '', url);
//     }
//   } catch (e) {
//     window.location[replace ? 'replace' : 'assign'](url);
//   }
// }

// function extend (a, b) {
//   for (const key in b) {
//     a[key] = b[key];
//   }
//   return a;
// }

// function fillParams (path, params, routeMsg) {
//   params = params || {};
//   try {
//     const filler =
//       regexpCompileCache[path] ||
//       (regexpCompileCache[path] = Regexp.compile(path));

//     // Fix #2505 resolving asterisk routes { name: 'not-found', params: { pathMatch: '/not-found' }}
//     // and fix #3106 so that you can work with location descriptor object having params.pathMatch equal to empty string
//     if (typeof params.pathMatch === 'string') params[0] = params.pathMatch;

//     return filler(params, { pretty: true });
//   } catch (e) {
//     if (process.env.NODE_ENV !== 'production') {
//       // Fix #3072 no warn if `pathMatch` is string
//       warn(typeof params.pathMatch === 'string', `missing param for ${routeMsg}: ${e.message}`);
//     }
//     return '';
//   } finally {
//     // delete the 0 if it was added
//     delete params[0];
//   }
// }

// function warn (condition, message) {
//   if (process.env.NODE_ENV !== 'production' && !condition) {
//     typeof console !== 'undefined' && console.warn(`[vue-router] ${message}`);
//   }
// }

// function resolveQuery(query, extraQuery, _parseQuery) {
//   const parse = _parseQuery || parseQuery;
//   let parsedQuery;
//   try {
//     parsedQuery = parse(query || '');
//   } catch (e) {
//     process.env.NODE_ENV !== 'production' && warn(false, e.message);
//     parsedQuery = {};
//   }
//   for (const key in extraQuery) {
//     parsedQuery[key] = extraQuery[key];
//   }
//   return parsedQuery;
// }

// function resolvePath(relative, base, append) {
//   const firstChar = relative.charAt(0);
//   if (firstChar === '/') {
//     return relative;
//   }

//   if (firstChar === '?' || firstChar === '#') {
//     return base + relative;
//   }

//   const stack = base.split('/');

//   // remove trailing segment if:
//   // - not appending
//   // - appending to trailing slash (last segment is empty)
//   if (!append || !stack[stack.length - 1]) {
//     stack.pop();
//   }

//   // resolve relative path
//   const segments = relative.replace(/^\//, '').split('/');
//   for (let i = 0; i < segments.length; i++) {
//     const segment = segments[i];
//     if (segment === '..') {
//       stack.pop();
//     } else if (segment !== '.') {
//       stack.push(segment);
//     }
//   }

//   // ensure leading slash
//   if (stack[0] !== '') {
//     stack.unshift('');
//   }

//   return stack.join('/');
// }

// function parsePath (path) {
//   let hash = '';
//   let query = '';

//   const hashIndex = path.indexOf('#');
//   if (hashIndex >= 0) {
//     hash = path.slice(hashIndex);
//     path = path.slice(0, hashIndex);
//   }

//   const queryIndex = path.indexOf('?');
//   if (queryIndex >= 0) {
//     query = path.slice(queryIndex + 1);
//     path = path.slice(0, queryIndex);
//   }

//   return {
//     path,
//     query,
//     hash,
//   };
// }

// function normalizeLocation(raw, current, append, router) {
//   let next = typeof raw === 'string' ? { path: raw } : raw;
//   // named target
//   if (next._normalized) {
//     return next;
//   } else if (next.name) {
//     next = extend({}, raw);
//     const params = next.params;
//     if (params && typeof params === 'object') {
//       next.params = extend({}, params);
//     }
//     return next;
//   }

//   // relative params
//   if (!next.path && next.params && current) {
//     next = extend({}, next);
//     next._normalized = true;
//     const params = extend(extend({}, current.params), next.params);
//     if (current.name) {
//       next.name = current.name;
//       next.params = params;
//     } else if (current.matched.length) {
//       const rawPath = current.matched[current.matched.length - 1].path;
//       next.path = fillParams(rawPath, params, `path ${current.path}`);
//     } else if (process.env.NODE_ENV !== 'production') {
//       warn(false, `relative params navigation requires a current route.`);
//     }
//     return next;
//   }

//   const parsedPath = parsePath(next.path || '');
//   const basePath = (current && current.path) || '/';

//   // TODO - need to make sure this isn't sanitized here...
//   const path = parsedPath.path
//     ? resolvePath(parsedPath.path, basePath, append || next.append)
//     : basePath;

//   const query = resolveQuery(
//     parsedPath.query,
//     next.query,
//     router && router.options.parseQuery
//   );

//   let hash = next.hash || parsedPath.hash;
//   if (hash && hash.charAt(0) !== '#') {
//     hash = `#${hash}`;
//   }

//   return {
//     _normalized: true,
//     path,
//     query,
//     hash,
//   };
// }

export default (router) => {

  console.log('router = ', router);

  // monkey patch to stop // being sanitized by cleanHref when mounting a base path which contains //.
  // Object.getPrototypeOf(router).push = function push(location, onComplete, onAbort) {
  //   const { current: fromRoute } = this;
  //   this.transitionTo(location, route => {
  //     pushState(`${this.base}${route.fullPath}`);
  //     handleScroll(this.router, route, fromRoute, false);
  //     onComplete && onComplete(route);
  //   }, onAbort);
  // }

  // // monkey patch to stop // being sanitized by cleanHref when mounting a base path which contains //.
  // Object.getPrototypeOf(router).resolve = function resolve(to, current, append) {
  //   current = current || this.history.current;
  //   const location = normalizeLocation(to, current, append, this);
  //   const route = this.match(location, current);
  //   const fullPath = route.redirectedFrom || route.fullPath;
  //   const base = this.history.base;
  //   const href = `${base}${fullPath}`;
  //   return {
  //     location,
  //     route,
  //     href,
  //     normalizedTo: location,
  //     resolved: route
  //   };
  // }

  Object.getPrototypeOf(router).replaceQueryParam = function replaceQueryParam(
    prop,
    val
  ) {
    const newQuery = {
      ...this.currentRoute.query,
      [prop]: val,
    };

    if (!newQuery[prop]) {
      delete newQuery[prop];
    }

    this.replace({ query: newQuery });
  };
};
