export function ok(payload: object | undefined, status: number = 200) {
  if (payload === undefined) {
    return empty(status);
  }
  return body(payload, status);
}

export function err(payload: object | undefined, status: number = 500) {
  if (payload === undefined) {
    return empty(status);
  }
  return body(payload, status);
}

function body(payload: object, status: number) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: responseHeaders,
  });
}

function empty(status: number) {
  return new Response(null, {
    status,
    headers: responseHeaders,
  });
}

const responseHeaders = {
  "content-type": "application/json; charset=utf-8",
};
