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
};

const colours_des = {
	normal: '#A8A77A90',
	fire: '#EE813090',
	water: '#6390F090',
	electric: '#F7D02C90',
	grass: '#7AC74C90',
	ice: '#96D9D690',
	fighting: '#C22E2890',
	poison: '#A33EA190',
	ground: '#E2BF6590',
	flying: '#A98FF390',
	psychic: '#F9558790',
	bug: '#A6B91A90',
	rock: '#B6A13690',
	ghost: '#73579790',
	dragon: '#6F35FC90',
	dark: '#70574690',
	steel: '#B7B7CE90',
	fairy: '#D685AD90',
};

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
};

export function padrao(type) { return colours[type] || '#777'; }
export function desaturada(type) { return colours_des[type] || '#7779'; }
export function contrastada(type) { return colours_con[type] || '#999'; }

//baseado em https://gist.github.com/apaleslimghost/0d25ec801ca4fc43317bcff298af43c3