import { NextRequest, NextResponse } from "next/server";

const hook = process.env.WEBHOOK;

export async function middleware(req) {
    await fetch(hook, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: "Vercel Tracker",
            embeds: [
                {
                    title: "New Request",
                    description: `${req.nextUrl.pathname}`,
                    color: 0x0099ff,
                    fields: [
                        {
                            name: "URL",
                            value: "```" + `${req.nextUrl.pathname}` + "```",
                        },
                        {
                            name: "UA",
                            value: "```" + req.headers.get("user-agent") + "```",
                        },
                        {
                            name: "Params",
                            value: "```" + JSON.stringify(req.nextUrl.searchParams) + "```",
                        }
                    ]
                },
            ],
        }),
    });
    return NextResponse.rewrite(new URL("/mini.png", req.url));
}