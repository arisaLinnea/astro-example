export async function GET() {
  const response = await fetch(
    "https://boardgamegeek.com/xmlapi2/hot?type=boardgame"
  );
  const hotlist = await response;
  console.log("hotlist", hotlist);
  //   const namelist = hotlist.items.item.map((item) => {
  //     return item.name.value;
  //   });
  return new Response(JSON.stringify({ msg: "HEj" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
