import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const copyFile = promisify(fs.copyFile);

async function copy(path, destination, overwrite) {
	let mode = overwrite ? 0 : fs.constants.COPYFILE_EXCL;

	return await copyFile(path, destination, mode);
}

export async function config(options) {
	options = {
		...options,
		targetDirectory: options.targetDirectory || process.cwd()
	};

	const currentFileUrl = import.meta.url;
	let pathName = new URL(currentFileUrl).pathname;
	if (process.platform === 'win32') {
		pathName = pathName.substr(1);
	}
	const templateDir = path.resolve(pathName, '../..');

	var files = [
		{ file: '.prettierignore', include: options.prettier },
		{ file: '.prettierrc', include: options.prettier },
		{ file: '.editorconfig', include: options.editorConfig },
		{ file: 'tslint.json', include: options.tslint }
	];

	for (const f of files) {
		if (f.include) {
			copy(
				path.resolve(templateDir, f.file),
				path.resolve(options.targetDirectory, f.file),
				options.overwrite
			).catch(console.log);
		}
	}
}
