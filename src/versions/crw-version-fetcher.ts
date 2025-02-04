import axios from 'axios';
import * as semver from 'semver';

export class CrwVersionFetcher {
  public static readonly CRW_POM_XML = 'https://raw.githubusercontent.com/redhat-developer/codeready-workspaces/HEAD/pom.xml';

  private version: Promise<string | undefined> | undefined;

   async init(): Promise<string | undefined> {
    // first, get CRW latest version
    const grabCRWVersion = /<\/parent>[^]*<version>(\d+\.\d+\.\d(?:-.*\d)*.GA)(?:-SNAPSHOT)?<\/version>[^]*<packaging>/gm;

    const response = await axios.get(CrwVersionFetcher.CRW_POM_XML);
    const data = response.data;

    const parsedVersion = grabCRWVersion.exec(data);
    if (parsedVersion) {
      return parsedVersion[1];
    } else {
      return undefined;
    }
  }

  public async getVersion(): Promise<string | undefined> {
    if (!this.version) {
      this.version = this.init();
    }

    return this.version;
  }

  public async getCurrentSprint(): Promise<string | undefined> {
    const version = await this.getVersion();
    if (version) {
      const crwMilestoneSemver = semver.coerce(version);
      if (crwMilestoneSemver) {
        const minor = crwMilestoneSemver.minor - 1;
        return `${crwMilestoneSemver?.major}.${minor}.${crwMilestoneSemver.patch}.GA`;
      }
    }
    return undefined;
  }

  public async getNextSprint(): Promise<string | undefined> {
    const version = await this.getVersion();
    if (version) {
      const crwMilestoneSemver = semver.coerce(version);
      if (crwMilestoneSemver) {
        const minor = crwMilestoneSemver.minor;
        return `${crwMilestoneSemver?.major}.${minor}.${crwMilestoneSemver.patch}.GA`;
      }
    }
    return undefined;
  }

  public async getPreviousSprint(): Promise<string | undefined> {
    const version = await this.getVersion();
    if (version) {
      const crwMilestoneSemver = semver.coerce(version);
      if (crwMilestoneSemver) {
        const minor = crwMilestoneSemver.minor - 2;
        return `${crwMilestoneSemver?.major}.${minor}.${crwMilestoneSemver.patch}.GA`;
      }
    }
    return undefined;
  }
}
