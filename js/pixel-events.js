// pixel-events.js
document.addEventListener("DOMContentLoaded", function() {
  console.log("📡 pixel-events.js carregado");

  // 🧠 Captura o nome do produto (caso exista)
  const produtoNome =
    document.querySelector("main h1")?.textContent.trim() || "produto-desconhecido";

  // 🎯 1️⃣ Evento de visualização da página de produto
  if (window.location.pathname.includes("/produto/")) {
    ttq.track("ViewContent", {
      content_type: "product_page",
      content_name: produtoNome,
      description: "Usuário visualizou uma página de produto",
    });

    console.log("👀 TikTok Pixel - ViewContent disparado para:", produtoNome);
  }

  // 🛒 2️⃣ Evento de clique no botão de compra (Mercado Livre)
  const botoes = document.querySelectorAll("a.btn-saiba-mais");

  botoes.forEach((botao) => {
    botao.addEventListener("click", function () {
      const destino = botao.href;

      // Só envia evento se for link de afiliado (Mercado Livre, Amazon, etc.)
      if (destino.includes("mercadolivre.com")) {
        ttq.track("ClickButton", {
          content_id: produtoNome.toLowerCase().replace(/\s+/g, "-"),
          content_name: produtoNome,
          content_type: "product",
          description: "Usuário clicou no botão de compra (Mercado Livre)",
          destination_url: destino,
          value: 0,
          currency: "BRL",
        });

        console.log("🎯 TikTok Pixel - ClickButton enviado:", {
          produto: produtoNome,
          destino: destino,
        });
      }
    });
  });
});
