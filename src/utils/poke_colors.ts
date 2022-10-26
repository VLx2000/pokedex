const colours = {
	normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
} as ITypes;

const colours_des = {
	normal: '#ceceb5',
	fire: '#f5b98d',
	water: '#a7bef5',
	electric: '#fae68e',
	grass: '#b4e19e',
	ice: '#c4eae8',
	fighting: '#dd8886',
	poison: '#cb90c8',
	ground: '#efdcab',
	flying: '#cebef6',
	psychic: '#fc9dba',
	bug: '#cdd984',
	rock: '#d6cb91',
	ghost: '#b09fc2',
	dragon: '#ae88f9',
	dark: '#aea097',
	steel: '#d6d6e2',
	fairy: '#e8b9d0',
} as ITypes;

const colours_con = {
	normal: '#53533c',
	fire: '#743f17',
	water: '#1f2d4a',
	electric: '#726014',
	grass: '#3b5f24',
	ice: '#466564',
	fighting: '#5f1714',
	poison: '#552054',
	ground: '#6b5b30',
	flying: '#544779',
	psychic: '#782941',
	bug: '#50590d',
	rock: '#5a501b',
	ghost: '#3f3053',
	dragon: '#381b7f',
	dark: '#3f3127',
	steel: '#585863',
	fairy: '#6a4256',
} as ITypes;

interface ITypes {
	[index: string]: string;
}

export const padrao = (type: string) => colours[type] ?? '#777';
export const desaturada = (type: string) => colours_des[type] ?? '#7779';
export const contrastada = (type: string) => colours_con[type] ?? '#999';

//baseado em https://gist.github.com/apaleslimghost/0d25ec801ca4fc43317bcff298af43c3

var corPadrao = '';
var corDesaturada = '';
var corContrastada = '';

function setColors(type: string) {
	corPadrao = padrao(type);
	corDesaturada = desaturada(type);
	corContrastada = contrastada(type);
}

export function styleCard(type: string) {
	setColors(type);
	return {
		borderColor: corPadrao,
		backgroundColor: corDesaturada,
		':hover': { boxShadow: "0 0 15px 10px" + corPadrao, },
		':active': { boxShadow: "0 0 15px 8px" + corContrastada, },
	}
}

export function styleNome(type: string) {
	setColors(type);
	return {color: corContrastada,}
}

export function styleId(type: string) {
	setColors(type);
	return {backgroundColor: corPadrao, color: corContrastada,}
}

export function styleTipo(type: string) {
	setColors(type);
	return {
		backgroundColor: corPadrao,
		color: corContrastada,
	}
}