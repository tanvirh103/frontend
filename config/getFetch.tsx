import { cookies } from "next/headers";
import { appConfig } from "./app.config";

const backendUrl = appConfig.BASE_URL;
console.log(backendUrl)

export async function getFetch({
  url,
  method = "get",
  tags,
  revalidate,
  body,
  dataType,
  params,
}: {
  url: string;
  method?: string;
  tags?: string[];
  revalidate?: false;
  body?: any;
  dataType?: string;
  params?: string;
}): Promise<any> {
  const cookie = await cookies();
  const token = cookie.get(appConfig.AUTH_COOKIE_KEY)?.value;
  const u = new URL(url, backendUrl);
  const s = new URLSearchParams(params).toString();
  const fullUrl = s?.length ? u + "?" + s : u;
  const headers = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    "Content-Type":
      dataType === "FormData"
        ? "multipart/form-data"
        : "application/json;charset=UTF-8",
  };

  const fetchOptions: RequestInit = {
    method: method.toUpperCase(),
    headers,
    body: body
      ? dataType === "FormData"
        ? body
        : JSON.stringify(body)
      : undefined,
    next: {
      tags,
      revalidate,
    },
  };
  try {
    const result = await fetch(fullUrl.toString(), fetchOptions);
    const contentType = result.headers.get("content-type");
    const responseData = contentType?.includes("application/json")
      ? await result.json()
      : await result.text();
    if (!result.ok) {
      return responseData;
    }
    return responseData;
  } catch (error: any) {
    return {
      success: false,
      data: undefined,
      message:
        error instanceof TypeError
          ? "Network error. Check your internet connection or server status."
          : error.message || "Unexpected error occurred",
      statusCode: 0,
    };
  }
}
