import { Router, Request, Response } from 'express';
import { prisma } from '../app';
import { request } from 'http';

const router = Router();

//Crud do Model User

router.post('/usuarios', async (req: Request, res: Response) => {
    const { nome, email, senha, idade, estado, cidade } = req.body;

    const usuarioExistente = await prisma.user.findUnique({ where: { email } });

    if (usuarioExistente) {
        return res.status(400).json({ error: 'Usuário com este email já existe' });
    }
    
    try {
        const novoUsuario = await prisma.user.create({
            data: {
                nome,
                email,
                senha,
                idade,
                estado,
                cidade
            }
        });

        res.status(201).json({
            message: 'Usuário cadastrado com sucesso',
            usuario: novoUsuario
        });
    } catch (error) {
        res.status(400).json({ error: 'Erro ao criar usuário' });
    }
});

//Buscar Usuário por email

router.get('/usuarios/emails/:email',  async (req: Request, res: Response)=> {
    const { email } = req.params;

    const us = await prisma.user.findUnique({where: { email }});

    try {
        if (us) {
            return res.json(us);
        } else {
            res.status(400).json({ error: 'Usuário não encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Erro para achar usuário' });
    }
});

//Buscar Usuário por Id

router.get('/usuarios/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const us = await prisma.user.findUnique({ where: { id: Number(id) } });

        if (us) {
            return res.json(us);
        } else {
            res.status(404).json({ error: 'Usuário não encontrado' }); 
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuário' }); 
    }
});

//Deletar Usuário por Id

router.delete('/usuarios/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const us = await prisma.user.findUnique({ where: { id: Number(id) } });
        if (us) {
            const deletado = await prisma.user.delete({ where: { id: Number(req.params.id) } })
             return res.json({
                message: 'Vasco',
                deletado
            });
        } else {
            res.status(404).json({ error: 'Quer terminar com o que nem começou?' }); 
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuário' }); 
    }
});

//Atualizar usuário por Id

router.put('/usuarios/:id', async (req: Request, res: Response) => {
    const { id } = req.params;  
    const { nome, email, senha, idade, estado, cidade } = req.body;


    try {
        const us = await prisma.user.findUnique({ where: { id: Number(id) } });

        if (us) {
            if(email){
                const usuarioExistente = await prisma.user.findUnique({where: { email }})
                if (usuarioExistente && usuarioExistente.id !== Number(id)) {
                    return res.json({ error: 'Parado aí, esse email já existe' });
                }
            }
            if (email && email === us.email) {
                return res.status(400).json({ error: 'Amigo, que tipo de atualização coloca o mesmo email?' });
            }
            const updates = await prisma.user.update({
                where: { id: Number(id) },  
                data: {
                    nome,
                    email,
                    senha,
                    idade,
                    estado,
                    cidade
                }
            });
            return res.json({
                message: 'Sucesso: Usuário Atualizado',
                updates
            }); 
        } else {
            res.status(404).json({ error:'Acho que você quer atualizar demais' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
});

//Mostra o Banco existente

router.get('/banco', async(req:Request, res:Response) => {

    try {
        const usuarios = await prisma.user.findMany()
        res.json(usuarios)
    } catch (error) {
        res.status(500).json("Sem nada no banco")
    }

})

//Login do Usuário

router.post('/login', async (req: Request, res: Response) => {
    const { email, senha } = req.body;

    try {
        const usuario = await prisma.user.findUnique({ where: { email } });

        if (!usuario) {
            return res.status(401).json({ error: 'Email ou senha incorretos' });
        }

        if (senha !== usuario.senha) {
            return res.status(401).json({ error: 'Email ou senha incorretos' });
        }

        res.status(200).json({ message: 'Login bem-sucedido', usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email } });

    } catch (error) {
        console.error('Erro ao tentar logar:', error);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
});





//Crud do model filme


//Postar filmes

router.post('/filmes', async (req, res) => {
    try {
      const { nome, imagem } = req.body;
  
      const filme = await prisma.filme.create({
        data: {
          nome,
          imagem: Buffer.from(imagem, 'base64'),
        },
      });
  
      res.status(201).json(filme);
    } catch (error) {
      console.error('Erro ao salvar o filme:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });

//Achar filmes por id

router.get('/filmes/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const fil = await prisma.filme.findUnique({ where: { id: Number(id) } });

        if (fil) {
            return res.json(fil);
        } else {
            res.status(404).json({ error: 'Filme não encontrado' }); 
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar filme' }); 
    }
});

//Banco de Filmes

router.get('/escolhidos', async(req:Request, res:Response) => {

    try {
        const filmes = await prisma.filme.findMany()
        res.json(filmes)
    } catch (error) {
        res.status(500).json("Sem nada no banco")
    }

})

//Atualizar

router.put('/filmes/:id', async (req: Request, res: Response) => {
    const { id } = req.params;  
    const { nome, imagem} = req.body;


    try {
        const fil = await prisma.filme.findUnique({ where: { id: Number(id) } });

        if (fil) {
            const updates = await prisma.filme.update({
                where: { id: Number(id) },  
                data: {
                    nome, 
                    imagem
                }
            });
            return res.json({
                message: 'Sucesso: Filme Atualizado',
                updates
            }); 
        } else {
            res.status(404).json({ error:'Acho que você quer atualizar demais' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar filme' });
    }
});

//Deletar filmes

router.delete('/filmes/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const fil = await prisma.filme.findUnique({ where: { id: Number(id) } });
        if (fil) {
            const deletado = await prisma.filme.delete({ where: { id: Number(req.params.id) } })
             return res.json({
                message: 'Vasco',
                deletado
            });
        } else {
            res.status(404).json({ error: 'Quer terminar com o que nem começou?' }); 
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar filme' }); 
    }
});

export default router