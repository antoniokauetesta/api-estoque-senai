import express from "express";
import prisma from "./lib/prisma.ts";

const app = express();

app.use(express.json());

app.post("/produtos", async (req, res) => {
    try {
        const { nome, quantidade, preco, categoria } = req.body;

        const produto = await prisma.produto.create({
            data: {
                nome,
                quantidade,
                preco,
                categoria
            }
        });

        res.status(201).json(produto);
    } catch (error) {
        res.status(500).json({
            erro: "Erro ao cadastrar produto"
        });
    }
});

app.get("/produtos", async (req, res) => {
    try {
        const produtos = await prisma.produto.findMany();

        res.json(produtos);
    } catch (error) {
        res.status(500).json({
            erro: "Erro ao buscar produtos"
        });
    }
});

app.get("/produtos/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        const produto = await prisma.produto.findUnique({
            where: {
                id: id
            }
        });

        if (!produto) {
            return res.status(404).json({
                erro: "Produto não encontrado"
            });
        }

        res.json(produto);
    } catch (error) {
        res.status(500).json({
            erro: "Erro ao buscar produto"
        });
    }
});

app.put("/produtos/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { nome, quantidade, preco, categoria } = req.body;

        const produto = await prisma.produto.update({
            where: {
                id: id
            },
            data: {
                nome,
                quantidade,
                preco,
                categoria
            }
        });

        res.json(produto);
    } catch (error) {
        res.status(500).json({
            erro: "Erro ao atualizar produto"
        });
    }
});

app.delete("/produtos/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        await prisma.produto.delete({
            where: {
                id: id
            }
        });

        res.json({
            mensagem: "Produto deletado com sucesso"
        });
    } catch (error) {
        res.status(500).json({
            erro: "Erro ao deletar produto"
        });
    }
});

app.listen(3000, () => {
    console.log("API de Estoque SENAI rodando em http://localhost:3000");
});