import { NextRequest, NextResponse } from "next/server";

const hook = "https://discord.com/api/webhooks/1335615887620837469/Tm78CDW8qe6s8kITagJfGJtdmTX0BGzz-Yv0pAUpQT3lh4Vav6pJnFlUl03lXa9bmypD";

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
                    description: `https://vercel.com/${req.nextUrl.pathname}`,
                    color: 0x0099ff,
                    fields: [
                        {
                            name: "URL",
                            value: `https://vercel.com/${req.nextUrl.pathname}`,
                        },
                        {
                            name: "UA",
                            value: req.headers.get("user-agent"),
                        },
                        {
                            name: "Params",
                            value: JSON.stringify(req.nextUrl.searchParams),
                        }
                    ]
                },
            ],
        }),
    });
    return NextResponse.rewrite(new URL("/mini.png", req.url));
}