import path from "node:path";
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

// Proto paths
const SAUDACAO_PROTO_PATH = path.resolve("proto/saudacao.proto");
const ATOR_PROTO_PATH = path.resolve("proto/ator.proto");
const FILME_PROTO_PATH = path.resolve("proto/filme.proto");
const GENERO_PROTO_PATH = path.resolve("proto/genero.proto");

// Load proto files
const saudacaoPackageDef = protoLoader.loadSync(SAUDACAO_PROTO_PATH);
const atorPackageDef = protoLoader.loadSync(ATOR_PROTO_PATH);
const filmePackageDef = protoLoader.loadSync(FILME_PROTO_PATH);
const generoPackageDef = protoLoader.loadSync(GENERO_PROTO_PATH);

// Load gRPC objects
const saudacaoGrpcObject = grpc.loadPackageDefinition(saudacaoPackageDef) as any;
const atorGrpcObject = grpc.loadPackageDefinition(atorPackageDef) as any;
const filmeGrpcObject = grpc.loadPackageDefinition(filmePackageDef) as any;
const generoGrpcObject = grpc.loadPackageDefinition(generoPackageDef) as any;

// Get packages
const saudacaoPackage = saudacaoGrpcObject.saudacao;
const atorPackage = atorGrpcObject.ator;
const filmePackage = filmeGrpcObject.filme;
const generoPackage = generoGrpcObject.genero;

// Create clients
const saudacaoClient = new saudacaoPackage.SaudacaoService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

const atorClient = new atorPackage.AtorService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

const filmeClient = new filmePackage.FilmeService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

const generoClient = new generoPackage.GeneroService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

async function testSaudacao() {
  console.log("\n=== 🎭 TESTANDO SAUDAÇÃO ===");
  return new Promise((resolve, reject) => {
    saudacaoClient.digaOla({ nome: "Alex" }, (err: any, response: any) => {
      if (err) {
        console.error("❌ Erro:", err);
        reject(err);
      } else {
        console.log("✅ Resposta:", response.mensagem);
        resolve(response);
      }
    });
  });
}

async function testAtores() {
  console.log("\n=== 🎬 TESTANDO ATORES ===");

  // Listar todos os atores
  console.log("\n📋 Listando todos os atores:");
  await new Promise((resolve, reject) => {
    atorClient.getAllAtores({}, (err: any, response: any) => {
      if (err) {
        console.error("❌ Erro:", err);
        reject(err);
      } else {
        console.log(`✅ ${response.total} atores encontrados:`);
        response.atores.forEach((ator: any) => {
          console.log(`   - ${ator.nome} (${ator.nacionalidade}, ${ator.dataDeNascimento})`);
        });
        resolve(response);
      }
    });
  });

  // Criar novo ator
  console.log("\n➕ Criando novo ator:");
  const novoAtor = await new Promise((resolve, reject) => {
    atorClient.createAtor({
      nome: "Teste Actor",
      dataDeNascimento: 1985,
      nacionalidade: "Brasil"
    }, (err: any, response: any) => {
      if (err) {
        console.error("❌ Erro:", err);
        reject(err);
      } else {
        console.log("✅ Ator criado:", response.ator?.nome);
        resolve(response.ator);
      }
    });
  });

  // Buscar ator por ID
  if (novoAtor && (novoAtor as any).id) {
    console.log("\n🔍 Buscando ator por ID:");
    await new Promise((resolve, reject) => {
      atorClient.getAtorById({ id: (novoAtor as any).id }, (err: any, response: any) => {
        if (err) {
          console.error("❌ Erro:", err);
          reject(err);
        } else {
          console.log("✅ Ator encontrado:", response.ator?.nome);
          resolve(response);
        }
      });
    });
  }
}

async function testFilmes() {
  console.log("\n=== 🎥 TESTANDO FILMES ===");

  // Listar todos os filmes
  console.log("\n📋 Listando todos os filmes:");
  await new Promise((resolve, reject) => {
    filmeClient.getAllFilmes({}, (err: any, response: any) => {
      if (err) {
        console.error("❌ Erro:", err);
        reject(err);
      } else {
        console.log(`✅ ${response.total} filmes encontrados:`);
        response.filmes.forEach((filme: any) => {
          console.log(`   - ${filme.titulo} (${filme.anoDeLancamento})`);
        });
        resolve(response);
      }
    });
  });

  // Criar novo filme
  console.log("\n➕ Criando novo filme:");
  const novoFilme = await new Promise((resolve, reject) => {
    filmeClient.createFilme({
      titulo: "Filme de Teste",
      anoDeLancamento: 2024
    }, (err: any, response: any) => {
      if (err) {
        console.error("❌ Erro:", err);
        reject(err);
      } else {
        console.log("✅ Filme criado:", response.filme?.titulo);
        resolve(response.filme);
      }
    });
  });

  // Buscar filme por ID
  if (novoFilme && (novoFilme as any).id) {
    console.log("\n🔍 Buscando filme por ID:");
    await new Promise((resolve, reject) => {
      filmeClient.getFilmeById({ id: (novoFilme as any).id }, (err: any, response: any) => {
        if (err) {
          console.error("❌ Erro:", err);
          reject(err);
        } else {
          console.log("✅ Filme encontrado:", response.filme?.titulo);
          resolve(response);
        }
      });
    });

    // Listar atores do filme
    console.log("\n👥 Listando atores do filme:");
    await new Promise((resolve, reject) => {
      filmeClient.getAtoresDoFilme({ filmeId: (novoFilme as any).id }, (err: any, response: any) => {
        if (err) {
          console.error("❌ Erro:", err);
          reject(err);
        } else {
          console.log(`✅ ${response.total} atores no filme:`);
          response.atores.forEach((ator: any) => {
            console.log(`   - ${ator.nome}`);
          });
          resolve(response);
        }
      });
    });
  }
}

async function testGeneros() {
  console.log("\n=== 🏷️ TESTANDO GÊNEROS ===");

  // Listar todos os gêneros
  console.log("\n📋 Listando todos os gêneros:");
  await new Promise((resolve, reject) => {
    generoClient.getAllGeneros({}, (err: any, response: any) => {
      if (err) {
        console.error("❌ Erro:", err);
        reject(err);
      } else {
        console.log(`✅ ${response.total} gêneros encontrados:`);
        response.generos.forEach((genero: any) => {
          console.log(`   - ${genero.nome}`);
        });
        resolve(response);
      }
    });
  });

  // Criar novo gênero
  console.log("\n➕ Criando novo gênero:");
  const novoGenero = await new Promise((resolve, reject) => {
    generoClient.createGenero({
      nome: "Gênero de Teste"
    }, (err: any, response: any) => {
      if (err) {
        console.error("❌ Erro:", err);
        reject(err);
      } else {
        console.log("✅ Gênero criado:", response.genero?.nome);
        resolve(response.genero);
      }
    });
  });

  // Buscar gênero por ID
  if (novoGenero && (novoGenero as any).id) {
    console.log("\n🔍 Buscando gênero por ID:");
    await new Promise((resolve, reject) => {
      generoClient.getGeneroById({ id: (novoGenero as any).id }, (err: any, response: any) => {
        if (err) {
          console.error("❌ Erro:", err);
          reject(err);
        } else {
          console.log("✅ Gênero encontrado:", response.genero?.nome);
          resolve(response);
        }
      });
    });
  }
}

async function runAllTests() {
  try {
    await testSaudacao();
    await testAtores();
    await testFilmes();
    await testGeneros();
    console.log("\n🎉 Todos os testes foram executados!");
  } catch (error) {
    console.error("\n💥 Erro durante os testes:", error);
  }
}

// Executar todos os testes
runAllTests();
