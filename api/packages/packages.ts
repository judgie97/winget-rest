/**import { ObjectId } from "mongodb";

export type PackageMultipleResponse = {
  Data: PackageManifest[];
  ContinuationToken: string;
};

export type PackageSingleResponse = {
  Data: PackageManifest;
};

export type PackageManifest = {
  PackageIdentifier: string;
  Versions?: Version[];
};

export type VersionSingleResponse = {
  Data: Version;
  ContinuationToken: string;
};

export type Version = {
  PackageVersion: string;
  DefaultLocale: DefaultLocale;
  Channel: string;
  Locales: Locale[];
  Installers?: Installer[];
};

export type DefaultLocale = {
  PackageLocale: string;
  Publisher: string;
  PublisherUrl?: string;
  PublisherSupportUrl?: string;
  PrivacyUrl?: string;
  Author?: string;
  PackageName: string;
  PackageUrl?: string;
  License: string;
  LicenseUrl?: string;
  Copyright?: string;
  CopyrightUrl?: string;
  ShortDescription: string;
  Description?: string;
  Tags?: string[];
  ReleaseNotes?: string;
  ReleaseNotesUrl?: string;
  Agreements?: {
    AgreementLabel?: string;
    Agreement?: string;
    AgreementUrl?: string;
  }[];
  PurchaseUrl?: string;
  InstallationNotes?: string;
  Documentations?: {
    DocumentLabel?: string;
    DocumentUrl?: string;
  }[];
  Moniker?: string;
};

export type Locale = {
  PackageLocale: string;
  Publisher: string;
  PublisherUrl?: string;
  PublisherSupportUrl?: string;
  PrivacyUrl?: string;
  Author?: string;
  PackageName: string;
  PackageUrl?: string;
  License: string;
  LicenseUrl?: string;
  Copyright?: string;
  CopyrightUrl?: string;
  ShortDescription: string;
  Description?: string;
  Tags?: string[];
  ReleaseNotes?: string;
  ReleaseNotesUrl?: string;
  Agreements?: {
    AgreementLabel?: string;
    Agreement?: string;
    AgreementUrl?: string;
  }[];
  PurchaseUrl?: string;
  InstallationNotes?: string;
  Documentations?: {
    DocumentLabel?: string;
    DocumentUrl?: string;
  }[];
};

export type Installer = {
  InstallerIdentifier?: string;
  InstallerSha256?: string;
  InstallerUrl?: string;
  Architecture: "x86" | "x64" | "arm" | "arm64" | "neutral";
  InstallerLocale?: string;
  Platform?: ("Windows.Desktop" | "Windows.Universal")[];
  MinimumOSVersion?: string;
  InstallerType:
    | "msix"
    | "msi"
    | "appx"
    | "exe"
    | "inno"
    | "nullsoft"
    | "wix"
    | "burn"
    | "portable"
    | "zip"
    | "pwa"
    | "msstore";
  Scope?: "User" | "Machine";
  SignatureSha256?: string;
  InstallModes?: ("interactive" | "silent" | "silentWithProgress")[];
  InstallerSwitches?: {
    Silent: string;
    SilentWithProgress: string;
    Interactive: string;
    InstallLocation: string;
    Log: string;
    Upgrade: string;
    Custom: string;
  };
  InstallerSuccessCodes?: number[];
  ExpectedReturnCodes?: {
    InstallerReturnCode: number;
    ReturnResponse: string;
    ReturnResponseUrl?: string;
  }[];
  UpgradeBehaviour?: "install" | "uninstallPrevious";
  Commands?: string[];
  Protocols?: string[];
  FileExtensions?: string[];
  Dependencies?: {
    WindowsFeatures?: string;
    WindowsLibrary?: string;
    PackageDependencies?: {
      PackageIdentifier: string;
      MinimumVersion?: string;
    };
    ExternalDependencies?: string;
  };
  PackageFamilyName?: string;
  ProductCode?: string;
  Capabilities?: string[];
  RestrictedCapabilities?: string[];
  MSStoreProductIdentifier?: string;
  InstallerAbortsTerminal?: boolean;
  ReleaseDate?: string;
  InstallLocationRequired?: boolean;
  RequireExplicitUpgrade?: boolean;
  ElevationRequirement?:
    | "elevationRequired"
    | "elevationProhibited"
    | "elevatesSelf";
  UnsupportedOSArchitectures?: "x86" | "x64" | "arm" | "arm64";
  AppsAndFeaturesEntries?: {
    DisplayName?: string;
    Publisher?: string;
    DisplayVersion?: string;
    ProductCode?: string;
    UpgradeCode?: string;
    InstallerType?:
      | "msix"
      | "msi"
      | "appx"
      | "exe"
      | "inno"
      | "nullsoft"
      | "wix"
      | "burn"
      | "portable"
      | "zip"
      | "pwa"
      | "msstore";
  }[];
  Markets?: { AllowedMarkets: string[] } | { ExcludedMarkets: string[] };
  NestedInstallerTypes?:
    | "msix"
    | "msi"
    | "appx"
    | "exe"
    | "inno"
    | "nullsoft"
    | "wix"
    | "burn"
    | "portable";
  NestedInstallerFiles?: {
    RelativeFilePath: string;
    PortableCommandAlias?: string;
  }[];
  DisplayInstallWarnings?: boolean;
  UnsupportedArguments?: "log" | "location";
  InstallationMetadata?: {
    DefaultInstallLocation: string;
    Files?: {
      RelativeFilePath: string;
      FileSha256?: string;
      FileType?: string;
      InvocationParameter?: string;
      DisplayName?: string;
    }[];
  };
};
**/
