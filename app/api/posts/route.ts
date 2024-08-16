import { getPostsByApiKey } from "@/utils/actions/blog/getPosts";

export async function GET(req: Request) {
  const apiKey = req.headers.get('x-api-key') as string;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key is required' }), {
      status: 400,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow all origins
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', // Allow necessary methods
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-key', // Allow necessary headers
      },
    });
  }

  try {
    const posts = await getPostsByApiKey(apiKey);
    return new Response(JSON.stringify({ data: posts }), {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow all origins
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', // Allow necessary methods
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-key', // Allow necessary headers
      },
    });
  } catch (error: any) {
    console.error('Error fetching posts:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow all origins
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', // Allow necessary methods
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-key', // Allow necessary headers
      },
    });
  }
}
