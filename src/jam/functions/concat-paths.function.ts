export function concatPaths ( ...paths: Array<string> ): string
{
	var combinedPath: string = '';
	paths.forEach( path => combinedPath = combinedPath.concat( path, '/' ) );
	return combinedPath
		.concat( '/' )
		.replace( '//', '/' );
}