import arg from 'arg';
import { config } from './main';

function parseArgs(rawArgs) {
	const args = arg(
		{
			'--all': Boolean,
			'--overwrite': Boolean,
			'--prettier': Boolean,
			'--tslint': Boolean,
			'--editorconfig': Boolean,
			'-a': '--all',
			'-o': '--overwrite'
		},
		{
			argv: rawArgs.slice(2)
		}
	);
	return {
		all: args['--all'] || false,
		overwrite: args['--overwrite'] || false,
		prettier: args['--all'] || args['--prettier'] || false,
		tslint: args['--all'] || args['--tslint'] || false,
		editorConfig: args['--all'] || args['--editorconfig'] || false
	};
}

function printUsage() {
	console.log(`Installs development configuration files.
usage: config-dev [options]
options:
	-a --all\tInstall all config files.
	-o --overwrite\tOverwrite files.
	--prettier\tInstall prettier files.
	--tslint\tInstall tslint files.
	--editorconfig\tInstall editorconfig files.`);
}

export function cli(args) {
	if (args.length <= 2) {
		printUsage();
		return;
	}

	let options;
	try {
		options = parseArgs(args);
	} catch (err) {
		console.log(err.message);
		printUsage();
		return;
	}

	config(options);
}
