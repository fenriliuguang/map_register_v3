import { request } from '@/utils';

/** 新增路线 返回新增路线ID PUT /route/add */
export async function createRoute(
  params: {
    // header
},
  body: API.Routeqianduanfengzhuang,
  options?: { [key: string]: any },
) {
  return request<API.RLong>(`/api/route/add`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 修改路线 修改路线 POST /route */
export async function updateRoute(
  params: {
    // header
},
  body: API.Routeqianduanfengzhuang,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean>(`/api/route`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 根据条件筛选分页查询路线信息 根据条件筛选分页查询路线信息，会根据当前角色决定不同的显隐等级 POST /route/get/search */
export async function listRoutePageSearch(
  params: {
    // header
},
  body: API.luxianfenyechaxunqianduanfengzhuang,
  options?: { [key: string]: any },
) {
  return request<API.RPageListVoRouteqianduanfengzhuang>(`/api/route/get/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 分页查询所有路线信息 分页查询所有路线信息，会根据当前角色决定不同的显隐等级 POST /route/get/page */
export async function listRoutePage(
  params: {
    // header
},
  body: API.PageSearchVo,
  options?: { [key: string]: any },
) {
  return request<API.RPageListVoRouteqianduanfengzhuang>(`/api/route/get/page`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 根据id列表查询路线信息 根据id列表查询路线信息，会根据当前角色决定不同的显隐等级 POST /route/get/list_byid */
export async function listRouteById(
  params: {
    // header
},
  body: number[],
  options?: { [key: string]: any },
) {
  return request<API.RListRouteqianduanfengzhuang>(`/api/route/get/list_byid`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 删除路线 删除路线，请在前端做二次确认 DELETE /route/${param0} */
export async function deleteRoute(
  params: {
    // header
// path
    routeId: number;
  },
  options?: { [key: string]: any },
) {
  const { routeId: param0, ...queryParams } = params;
  return request<API.RBoolean>(`/api/route/${param0}`, {
    method: 'DELETE',
    headers: {},
    params: { ...queryParams },
    ...(options || {}),
  });
}
