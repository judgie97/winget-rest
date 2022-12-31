/**export type ManifestSearchRequest = {
  MaximumResults?: number;
  FetchAllManifests?: boolean;
  Query?: {
    Keyword?: string;
    MatchType?:
      | "Exact"
      | "CaseInsensitive"
      | "StartsWith"
      | "Substring"
      | "Wildcard"
      | "Fuzzy"
      | "FuzzySubstring";
  };
  Inclusions?: {
    PackageMatchField?:
      | "PackageIdentifier"
      | "PackageName"
      | "Moniker"
      | "Command"
      | "Tag"
      | "PackageFamilyName"
      | "ProductCode"
      | "NormalizedPackageNameAndPublisher"
      | "Market";
    RequestMatch?: {
      Keyword?: string;
      MatchType?:
        | "Exact"
        | "CaseInsensitive"
        | "StartsWith"
        | "Substring"
        | "Wildcard"
        | "Fuzzy"
        | "FuzzySubstring";
    };
  };
  Filters?: {
    PackageMatchField?:
      | "PackageIdentifier"
      | "PackageName"
      | "Moniker"
      | "Command"
      | "Tag"
      | "PackageFamilyName"
      | "ProductCode"
      | "NormalizedPackageNameAndPublisher"
      | "Market";
    RequestMatch?: {
      Keyword?: string;
      MatchType?:
        | "Exact"
        | "CaseInsensitive"
        | "StartsWith"
        | "Substring"
        | "Wildcard"
        | "Fuzzy"
        | "FuzzySubstring";
    };
  };
};

export class ManifestSearchResult {
  Data: ManifestSearchResponse[];
  ContinuationToken?: string;
  RequiredPackageMatchFields?: string[];
  UnsupportedPackageMatchFields?: string[];

  constructor(packages: PackageManifest[]) {
    this.Data = packages.map((p) => new ManifestSearchResponse(p));
  }
}

export class ManifestSearchResponse {
  PackageIdentifier: string;
  PackageName: string;
  Publisher: string;
  Versions?: ManifestSearchVersion[];

  constructor(packageManifest: PackageManifest) {
    this.PackageIdentifier = packageManifest.PackageIdentifier;
    this.PackageName =
      packageManifest?.Versions?.at(0)?.DefaultLocale.PackageName ?? "";
    this.Publisher =
      packageManifest?.Versions?.at(0)?.DefaultLocale.Publisher ?? "";
    this.Versions = packageManifest?.Versions?.map(
      (v) => new ManifestSearchVersion(v)
    );
  }
}

export class ManifestSearchVersion {
  PackageVersion: string;
  Channel?: string;
  PackageFamilyNames?: string[];
  ProductCodes?: string[];
  AppsAndFeaturesEntryVersions?: string[];
  UpgradeCodes?: string[];

  constructor(version: Version) {
    this.PackageVersion = "" + version.PackageVersion;
    this.Channel = version.Channel;
    this.PackageFamilyNames = []; //TODO FIGURE OUT WHERE THIS IS SUPPOSED TO COME FROM!
    this.ProductCodes = []; //TODO FIGURE OUT WHERE THIS IS SUPPOSED TO COME FROM!
    this.AppsAndFeaturesEntryVersions = []; //TODO FIGURE OUT WHERE THIS IS SUPPOSED TO COME FROM!
    this.UpgradeCodes = []; //TODO FIGURE OUT WHERE THIS IS SUPPOSED TO COME FROM!
  }
}
**/
