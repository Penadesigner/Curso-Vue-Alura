import IProjeto from "./IProjetos"

export default interface ITarefa {
    duracaoEmSegundos: Number
    descricao: String
    projeto: IProjeto
    id: Number
}