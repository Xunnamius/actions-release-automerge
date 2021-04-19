import { name as pkgName } from '../../package.json';
import { ComponentAction } from '../../types/global';
import { installDependencies } from '../utils/install';
import metadataCollect from './metadata-collect';
import debugFactory from 'debug';
import execa from 'execa';

const debug = debugFactory(`${pkgName}:${ComponentAction.TestIntegrationExternals}`);

export default async function () {
  const { shouldSkipCi } = await metadataCollect();

  if (!shouldSkipCi) {
    await installDependencies();
    await execa('npm', ['run', 'test-integration-externals'], { stdio: 'inherit' });
  } else debug(`skipped component action "${ComponentAction.TestIntegrationExternals}"`);
}
