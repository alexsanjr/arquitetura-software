import path from "node:path";
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import { AtorImplementation } from "./Ator/Implementation.js";
import { FilmeImplementation } from "./Filme/Implementation.js";
import { GeneroImplementation } from "./Genero/Implementation.js";

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

// Create implementations
const atorImplementation = new AtorImplementation();
const filmeImplementation = new FilmeImplementation();
const generoImplementation = new GeneroImplementation();

function digaOla(call: any, callback: any) {
  callback(null, { mensagem: `Olá, ${call.request.nome}!` });
}

const server = new grpc.Server();

// Add services
server.addService(saudacaoPackage.SaudacaoService.service, { digaOla });
server.addService(atorPackage.AtorService.service, {
  getAllAtores: atorImplementation.getAllAtores.bind(atorImplementation),
  getAtorById: atorImplementation.getAtorById.bind(atorImplementation),
  createAtor: atorImplementation.createAtor.bind(atorImplementation),
  updateAtor: atorImplementation.updateAtor.bind(atorImplementation),
  deleteAtor: atorImplementation.deleteAtor.bind(atorImplementation),
});

server.addService(filmePackage.FilmeService.service, {
  getAllFilmes: filmeImplementation.getAllFilmes.bind(filmeImplementation),
  getFilmeById: filmeImplementation.getFilmeById.bind(filmeImplementation),
  createFilme: filmeImplementation.createFilme.bind(filmeImplementation),
  updateFilme: filmeImplementation.updateFilme.bind(filmeImplementation),
  deleteFilme: filmeImplementation.deleteFilme.bind(filmeImplementation),
  getAtoresDoFilme: filmeImplementation.getAtoresDoFilme.bind(filmeImplementation),
  addAtorToFilme: filmeImplementation.addAtorToFilme.bind(filmeImplementation),
});

server.addService(generoPackage.GeneroService.service, {
  getAllGeneros: generoImplementation.getAllGeneros.bind(generoImplementation),
  getGeneroById: generoImplementation.getGeneroById.bind(generoImplementation),
  createGenero: generoImplementation.createGenero.bind(generoImplementation),
  updateGenero: generoImplementation.updateGenero.bind(generoImplementation),
  deleteGenero: generoImplementation.deleteGenero.bind(generoImplementation),
});

const bindAddress = "0.0.0.0:50051";
server.bindAsync(bindAddress, grpc.ServerCredentials.createInsecure(), (error, port) => {
  if (error) {
    console.error(`❌ Erro ao ligar servidor: ${error.message}`);
    return;
  }
  console.log(`🚀 Servidor gRPC rodando em ${bindAddress} (porta ${port})`);
  console.log(`📦 Serviços disponíveis:`);
  console.log(`   - SaudacaoService`);
  console.log(`   - AtorService`);
  console.log(`   - FilmeService`);
  console.log(`   - GeneroService`);
  server.start();
});
