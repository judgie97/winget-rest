import { Server } from "http";
import { z } from "zod";

export const APIVersionSchema = z
  .string()
  //.regex(new RegExp(`^([0-9]+.){0,3}(*|[0-9]+)$`))
  .max(128);

export const WindowsPackageManagerSchema = z.string().max(1024);

export const PackageIdentifierSchema = z
  .string()
  //.regex(new RegExp(`^[^\.\s\\/:\*\?"<>\|\x01-\x1f]{1,32}(\.[^\.\s\\/:\*\?"<>\|\x01-\x1f]{1,32}){1,3}$`))
  .max(128);

export const ContinuationTokenSchema = z.string().max(4096);

export const PackageVersionSchema = z
  .string()
  //.regex(new RegExp(`^[^\\/:\*\?"<>\|\x01-\x1f]+$`))
  .max(128);

export const InstallerIdentifierSchema = z.string().max(128);

export const PublisherSchema = z.string().min(2).max(256);

export const AuthorSchema = z.string().min(2).max(256);

export const PackageNameSchema = z.string().min(2).max(256);

export const LicenseSchema = z.string().min(3).max(512);

export const CopyrightSchema = z.string().min(3).max(512);

export const ShortDescriptionSchema = z.string().min(3).max(256);

export const DescriptionSchema = z.string().min(3).max(10000);

export const LocaleSchema = z.string();
//.regex(new RegExp(`^([a-zA-Z]{2}|[iI]-[a-zA-Z]+|[xX]-[a-zA-Z]{1,8})(-[a-zA-Z]{1,8})*$`)).strict();

export const URLSchema = z.string().url().max(2048);

export const TagSchema = z.string().min(1).max(40); //.regex(new RegExp(`^\S+$`)).strict();

export const TagsSchema = z.array(TagSchema);

export const AgreementSchema = z
  .object({
    AgreementLabel: z.string().min(1).max(100),
    Agreement: z.string().min(1).max(10000).nullable(),
    AgreementUrl: z.string().url().max(2048),
  })
  .strict();

export const AgreementsSchema = z.array(AgreementSchema);

export const ReleaseNotesSchema = z.string().min(1).max(10000);

export const ChannelSchema = z.string().min(1).max(16);

export const PlatformSchema = z.array(
  z.enum(["Windows.Desktop", "Windows.Universal"])
);

export const MinimumOSVersionSchema = z.string();
//.regex(new RegExp(`^(0|[1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])(\.(0|[1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])){0,3}$`)).strict();

export const InstallerTypeSchema = z.enum([
  "msix",
  "msi",
  "appx",
  "exe",
  "zip",
  "inno",
  "nullsoft",
  "wix",
  "burn",
  "pwa",
  "msstore",
]);

export const ScopeSchema = z.enum(["user", "machine"]);

export const InstallModeSchema = z.enum([
  "interactive",
  "silent",
  "silentWithProgress",
]);

export const InstallModesSchema = z.array(InstallModeSchema);

export const PackageDependencySchema = z
  .object({
    PackageIdentifier: PackageIdentifierSchema,
    MinimumVersion: PackageVersionSchema,
  })
  .strict();

export const InstallerSwitchesSchema = z
  .object({
    Silent: z.string().min(1).max(512),
    SilentWithProgress: z.string().min(1).max(512),
    Interactive: z.string().min(1).max(512),
    InstallLocation: z.string().min(1).max(512),
    Log: z.string().min(1).max(512),
    Upgrade: z.string().min(1).max(512),
    Custom: z.string().min(1).max(2048),
  })
  .strict();

export const InstallerReturnCodesSchema = z.array(
  z.number().int().min(-2147483648).max(4294967295)
);

export const ExpectedReturnCodeResponseSchema = z.enum([
  "packageInUse",
  "installInProgress",
  "fileInUse",
  "missingDependency",
  "diskFull",
  "insufficientMemory",
  "noNetwork",
  "contactSupport",
  "rebootRequiredToFinish",
  "rebootRequiredForInstall",
  "rebootInitiated",
  "cancelledByUser",
  "alreadyInstalled",
  "downgrade",
  "blockedByPolicy",
]);

export const ExpectedReturnCodeSchema = z
  .object({
    InstallerReturnCode: InstallerReturnCodesSchema,
    ReturnResponse: ExpectedReturnCodeResponseSchema,
  })
  .strict();

export const ExpectedReturnCodesSchema = z.array(ExpectedReturnCodeSchema);

export const UpgradeBehaviourSchema = z.enum(["install", "uninstallPrevious"]);

export const CommandsSchema = z.array(z.string().min(1).max(40));

export const ProtocolsSchema = z.array(
  z.string().max(2048) //.regex(new RegExp(`^[a-z][-a-z0-9\.\+]*$`))
);

export const FileExtensionsSchema = z.array(
  z.string().max(64) //.regex(new RegExp(`^[^\\/:\*\?"<>\|\x01-\x1f]+$`))
);

export const DependenciesSchema = z
  .object({
    WindowsFeatures: z.array(z.string().min(1).max(128)),
    WindowsLibraries: z.array(z.string().min(1).max(128)),
    PackageDependencies: PackageDependencySchema,
    ExternalDependencies: z.array(z.string().min(1).max(128)),
  })
  .strict();

export const PackageFamilyNameSchema = z.string().max(255);
//.regex(new RegExp(`^[A-Za-z0-9][-\.A-Za-z0-9]+_[A-Za-z0-9]{13}$`)).strict();

export const ProductCodeSchema = z.string().min(1).max(255);

export const CapabilitiesSchema = z.array(z.string().min(1).max(40));

export const RestrictedCapabilitiesSchema = z.array(z.string().min(1).max(40));

export const InstallerSha256Schema = z.string();
//.regex(new RegExp(`^[A-Fa-f0-9]{64}$`)).strict();

export const SignatureSha256Schema = z.string();
//.regex(new RegExp(`^[A-Fa-f0-9]{64}$`)).strict();

export const ArchitectureNonNeutralSchema = z.enum([
  "x86",
  "x64",
  "arm",
  "arm64",
]);

//TODO check this. This was listed as 2 separate enums
export const ArchitectureSchema = z.enum([
  "x86",
  "x64",
  "arm",
  "arm64",
  "neutral",
]);

export const MSStoreProductIdentifierSchema = z.string();
//.regex(new RegExp(`^[A-Za-z0-9]{12}$`)).strict();

export const MarketSchema = z.string(); //.regex(new RegExp(`^[A-Z]{2}$`)).strict();

export const MarketArraySchema = z.array(MarketSchema);

export const MarketsSchema = z
  .object({
    AllowedMarkets: MarketArraySchema,
    ExcludedMarkets: MarketArraySchema,
  })
  .strict();

export const InstallerAbortsTerminalSchema = z.boolean();

export const ReleaseDateSchema = z.string();

export const InstallLocationRequiredSchema = z.boolean();

export const RequireExplicitUpgradeSchema = z.boolean();

export const ElevationRequirementSchema = z.enum([
  "elevationRequired",
  "elevationProhibited",
  "elevatesSelf",
]);

export const UnsupportedOSArchitecturesSchema = z.array(
  z.enum(["x86", "x64", "arm", "arm64"])
);

export const AppsAndFeaturesEntrySchema = z
  .object({
    DisplayName: z.string().min(1).max(256),
    Publisher: z.string().min(1).max(256),
    DisplayVersion: z.string().min(1).max(128),
    ProductCode: z.string().min(1).max(255),
    UpgradeCode: z.string().min(1).max(255),
    InstallerType: z.enum([
      "msix",
      "msi",
      "appx",
      "exe",
      "zip",
      "inno",
      "nullsoft",
      "wix",
      "burn",
      "pwa",
      "msstore",
    ]),
  })
  .strict();

export const AppsAndFeaturesEntriesSchema = z.array(AppsAndFeaturesEntrySchema);

export const SourceIdentifierSchema = z.string().min(1).max(128);

export const SourceAgreementsSchema = z
  .object({
    AgreementsIdentifier: z.string().min(1).max(128),
    Agreements: AgreementSchema,
  })
  .strict();

export const ServerSupportedVersionsSchema = z.array(
  z.string().min(1).max(128)
);

export const PackageMatchFieldArraySchema = z.array(
  z.enum([
    "PackageIdentifier",
    "PackageName",
    "Moniker",
    "Command",
    "Tag",
    "PackageFamilyName",
    "ProductCode",
    "NormalizedPackageNameAndPublisher",
    "Market",
  ])
);

export const QueryParameterArraySchema = z.array(
  z.enum(["Version", "Channel", "Market"])
);

export const InstallerSuccessCodesSchema = z.array(
  z.number().int().min(-2147483648).max(4294967295)
);

export const InstallerSchema = z
  .object({
    InstallerIdentifier: InstallerIdentifierSchema,
    InstallerSha256: InstallerSha256Schema,
    InstallerUrl: URLSchema,
    Architecture: ArchitectureSchema,
    InstallerLocale: LocaleSchema,
    Platform: PlatformSchema,
    MinimumOSVersion: MinimumOSVersionSchema,
    InstallerType: InstallerTypeSchema,
    Scope: ScopeSchema,
    SignatureSha256: SignatureSha256Schema,
    InstallModes: InstallModesSchema,
    InstallerSwitches: InstallerSwitchesSchema,
    InstallerSuccessCodes: InstallerSuccessCodesSchema,
    ExpectedReturnCodes: ExpectedReturnCodesSchema,
    UpgradeBehaviour: UpgradeBehaviourSchema,
    Commands: CommandsSchema,
    Protocols: ProtocolsSchema,
    FileExtensions: FileExtensionsSchema,
    Dependencies: DependenciesSchema,
    PackageFamilyName: PackageFamilyNameSchema,
    ProductCode: ProductCodeSchema,
    Capabilities: CapabilitiesSchema,
    RestrictedCapabilities: RestrictedCapabilitiesSchema,
    MSStoreProductIdentifier: MSStoreProductIdentifierSchema,
    InstallerAbortsTerminal: InstallerAbortsTerminalSchema,
    ReleaseDate: ReleaseDateSchema,
    InstallLocationRequired: InstallLocationRequiredSchema,
    RequireExplicitUpgrade: RequireExplicitUpgradeSchema,
    ElevationRequirement: ElevationRequirementSchema,
    UnsupportedOSArchitectures: UnsupportedOSArchitecturesSchema,
    AppsAndFeaturesEntries: AppsAndFeaturesEntriesSchema,
    Markets: MarketsSchema,
  })
  .strict();

export const PackageSchemaSchema = z
  .object({
    PackageIdentifier: z.string(),
    //.regex(new RegExp(`^[^\.\s\\/:\*\?"<>\|\x01-\x1f]{1,32}(\.[^\.\s\\/:\*\?"<>\|\x01-\x1f]{1,32}){1,3}$`)),
  })
  .strict();

export const DefaultLocaleSchema = z
  .object({
    PackageLocale: LocaleSchema,
    Publisher: PublisherSchema,
    PublisherUrl: URLSchema.optional(),
    PublisherSupportUrl: URLSchema.optional(),
    PrivacyUrl: URLSchema.optional(),
    Author: AuthorSchema.optional(),
    PackageName: PackageNameSchema,
    PackageUrl: URLSchema.optional(),
    License: LicenseSchema,
    LicenseUrl: URLSchema.optional(),
    Copyright: CopyrightSchema.optional(),
    CopyrightUrl: URLSchema.optional(),
    ShortDescription: ShortDescriptionSchema,
    Description: DescriptionSchema.optional(),
    Tags: TagsSchema.optional(),
    ReleaseNotes: ReleaseNotesSchema.optional(),
    ReleaseNotesUrl: URLSchema.optional(),
    Agreements: AgreementsSchema.optional(),
    Moniker: TagSchema.optional(),
  })
  .strict();

export const VersionSchemaSchema = z
  .object({
    PackageVersion: PackageVersionSchema,
    DefaultLocale: DefaultLocaleSchema,
    Channel: ChannelSchema.optional(),
  })
  .strict();

export const LocaleSchemaSchema = z
  .object({
    PackageLocale: LocaleSchema,
    Publisher: PublisherSchema,
    PublisherUrl: URLSchema,
    PublisherSupportUrl: URLSchema,
    PrivacyUrl: URLSchema,
    Author: AuthorSchema,
    PackageName: PackageNameSchema,
    PackageUrl: URLSchema,
    License: LicenseSchema,
    LicenseUrl: URLSchema,
    Copyright: CopyrightSchema,
    CopyrightUrl: URLSchema,
    ShortDescription: ShortDescriptionSchema,
    Description: DescriptionSchema,
    Tags: TagsSchema,
    ReleaseNotes: ReleaseNotesSchema,
    ReleaseNotesUrl: URLSchema,
    Agreements: AgreementsSchema,
  })
  .strict();

export const OptionalLocaleSchema = z
  .object({
    PackageLocale: LocaleSchema,
    Publisher: PublisherSchema,
    PublisherUrl: URLSchema,
    PublisherSupportUrl: URLSchema,
    PrivacyUrl: URLSchema,
    Author: AuthorSchema,
    PackageName: PackageNameSchema,
    PackageUrl: URLSchema,
    License: LicenseSchema,
    LicenseUrl: URLSchema,
    Copyright: CopyrightSchema,
    CopyrightUrl: URLSchema,
    ShortDescription: ShortDescriptionSchema,
    Description: DescriptionSchema,
    Tags: TagsSchema,
    ReleaseNotes: ReleaseNotesSchema,
    ReleaseNotesUrl: URLSchema,
    Agreements: AgreementsSchema,
  })
  .strict();

export const InstallerSchemaSchema = z
  .object({
    InstallerIdentifier: InstallerIdentifierSchema,
    InstallerSha256: InstallerSha256Schema,
    InstallerUrl: URLSchema,
    Architecture: ArchitectureSchema,
    InstallerLocale: LocaleSchema,
    Platform: PlatformSchema,
    MinimumOSVersion: MinimumOSVersionSchema,
    InstallerType: InstallerTypeSchema,
    Scope: ScopeSchema,
    SignatureSha256: SignatureSha256Schema,
    InstallModes: InstallModesSchema,
    InstallerSwitches: InstallerSwitchesSchema,
    InstallerSuccessCodes: InstallerSuccessCodesSchema,
    ExpectedReturnCodes: ExpectedReturnCodesSchema,
    UpgradeBehaviour: UpgradeBehaviourSchema,
    Commands: CommandsSchema,
    Protocols: ProtocolsSchema,
    FileExtensions: FileExtensionsSchema,
    Dependencies: DependenciesSchema,
    PackageFamilyName: PackageFamilyNameSchema,
    ProductCode: ProductCodeSchema,
    Capabilities: CapabilitiesSchema,
    RestrictedCapabilities: RestrictedCapabilitiesSchema,
    MSStoreProductIdentifier: MSStoreProductIdentifierSchema,
    InstallerAbortsTerminal: InstallerAbortsTerminalSchema,
    ReleaseDate: ReleaseDateSchema,
    InstallLocationRequired: InstallLocationRequiredSchema,
    RequireExplicitUpgrade: RequireExplicitUpgradeSchema,
    ElevationRequirement: ElevationRequirementSchema,
    UnsupportedOSArchitectures: UnsupportedOSArchitecturesSchema,
    AppsAndFeaturesEntries: AppsAndFeaturesEntriesSchema,
    Markets: MarketsSchema,
  })
  .strict();

export const ManifestSchemaVersionSchema = z.object({
  PackageVersion: PackageVersionSchema,
  DefaultLocale: DefaultLocaleSchema,
  Channel: ChannelSchema.optional(),
  Locales: z.array(OptionalLocaleSchema).optional(),
  Installers: z.array(InstallerSchemaSchema).optional(),
});

export const ManifestSchemaSchema = z
  .object({
    PackageIdentifier: PackageIdentifierSchema,
    Versions: z.array(ManifestSchemaVersionSchema).optional(),
  })
  .strict();

export const ManifestSearchVersionSchemaSchema = z
  .object({
    PackageVersion: PackageVersionSchema,
    Channel: ChannelSchema.optional(),
    PackageFamilyNames: z.array(PackageFamilyNameSchema).optional(),
    ProductCodes: z.array(ProductCodeSchema).optional(),
  })
  .strict();

export const ManifestSearchResponseSchemaSchema = z
  .object({
    PackageIdentifier: PackageIdentifierSchema,
    PackageName: PackageNameSchema,
    Publisher: PublisherSchema,
    Versions: z.array(ManifestSearchVersionSchemaSchema).optional(),
  })
  .strict();

export const InformationSchemaSchema = z
  .object({
    SourceIdentifier: SourceIdentifierSchema,
    SourceAgreements: SourceAgreementsSchema.optional(),
    ServerSupportedVersions: ServerSupportedVersionsSchema,
    UnsupportedPackageMatchFields: PackageMatchFieldArraySchema.optional(),
    RequiredPackageMatchFields: PackageMatchFieldArraySchema.optional(),
    UnsupportedQueryParameters: QueryParameterArraySchema.optional(),
    RequiredQueryParameters: QueryParameterArraySchema.optional(),
  })
  .strict();

export const ResponseObjectSchemaSchema = z
  .object({
    Data: z.any(),
    ContinuationToken: ContinuationTokenSchema,
  })
  .strict();

export const PackageMultipleResponseSchemaSchema = z
  .object({
    Data: z.array(PackageSchemaSchema),
    ContinuationToken: ContinuationTokenSchema,
  })
  .strict();

export const PackageSingleResponseSchemaSchema = z
  .object({
    Data: PackageSchemaSchema,
    ContinuationToken: ContinuationTokenSchema,
  })
  .strict();

export const VersionMultipleResponseSchemaSchema = z
  .object({
    Data: z.array(VersionSchemaSchema),
    ContinuationToken: ContinuationTokenSchema.optional(),
  })
  .strict();

export const VersionSingleResponseSchema = z
  .object({
    Data: VersionSchemaSchema,
    ContinuationToken: ContinuationTokenSchema,
  })
  .strict();

export const LocaleMultipleResponseSchemaSchema = z
  .object({
    Data: z.array(OptionalLocaleSchema),
    ContinuationToken: ContinuationTokenSchema,
  })
  .strict();

export const LocaleSingleResponseSchemaSchema = z
  .object({
    Data: OptionalLocaleSchema,
    ContinuationToken: ContinuationTokenSchema,
  })
  .strict();

export const InstallerMultipleResponseSchemaSchema = z
  .object({
    Data: z.array(InstallerSchema),
    ContinuationToken: ContinuationTokenSchema,
  })
  .strict();

export const InstallerSingleResponseSchemaSchema = z
  .object({
    Data: InstallerSchema,
    ContinuationToken: ContinuationTokenSchema,
  })
  .strict();

export const ManifestMultipleResponseSchemaSchema = z
  .object({
    Data: z.array(ManifestSchemaSchema),
    ContinuationToken: ContinuationTokenSchema,
  })
  .strict();

export const ManifestSingleResponseSchemaSchema = z
  .object({
    Data: ManifestSchemaSchema,
    ContinuationToken: ContinuationTokenSchema,
    UnsupportedQueryParameters: QueryParameterArraySchema.optional(),
    RequiredQueryParameters: QueryParameterArraySchema.optional(),
  })
  .strict();

export const InformationResponseSchemaSchema = z
  .object({
    Data: InformationSchemaSchema,
    ContinuationToken: ContinuationTokenSchema,
  })
  .strict();

export const ManifestSearchResultSchemaSchema = z
  .object({
    Data: z.array(ManifestSearchResponseSchemaSchema),
    ContinuationToken: ContinuationTokenSchema.optional(),
    RequiredPackageMatchFields: PackageMatchFieldArraySchema.optional(),
    UnsupportedPackageMatchFields: PackageMatchFieldArraySchema.optional(),
  })
  .strict();

export const MatchTypeSchema = z.enum([
  "Exact",
  "CaseInsensitive",
  "StartsWith",
  "Substring",
  "Wildcard",
  "Fuzzy",
  "FuzzySubstring",
]);

export const PackageMatchFieldSchema = z.enum([
  "PackageIdentifier",
  "PackageName",
  "Moniker",
  "Command",
  "Tag",
  "PackageFamilyName",
  "ProductCode",
  "NormalizedPackageNameAndPublisher",
  "Market",
]);

export const KeyWordSchema = z.string().max(255);

export const SearchRequestMatchSchema = z
  .object({
    KeyWord: KeyWordSchema,
    MatchType: MatchTypeSchema,
  })
  .strict();

export const SearchRequestPackageMatchFilterSchemaSchema = z
  .object({
    PackageMatchField: PackageMatchFieldSchema,
    RequestMatch: SearchRequestMatchSchema,
  })
  .strict();

export const SearchRequestInclusionAndFilterSchemaSchema = z
  .object({
    PackageMatchField: PackageMatchFieldSchema,
    RequestMatch: SearchRequestMatchSchema,
  })
  .strict();

export const ManifestSearchRequestSchema = z
  .object({
    MaximumResults: z.number().int(),
    FetchAllManifests: z.boolean(),
    Query: SearchRequestMatchSchema,
    Inclusions: z.array(SearchRequestInclusionAndFilterSchemaSchema),
    Filters: z.array(SearchRequestInclusionAndFilterSchemaSchema),
  })
  .strict();

export const ErrorSchema = z
  .object({
    ErrorCode: z.number().int(),
    ErrorMessage: z.string(),
  })
  .strict();

export const ManifestVersionSchemaSchema = z.object({
  PackageVersion: PackageVersionSchema,
  DefaultLocale: DefaultLocaleSchema,
  Channel: ChannelSchema.optional(),
  Locales: z.array(OptionalLocaleSchema).optional(),
  Installers: z.array(InstallerSchemaSchema).optional(),
});

//TYPES

export type PackageManifest = z.infer<typeof ManifestSchemaSchema>;

export type ManifestSearchReponseSchema = z.infer<
  typeof ManifestSearchResponseSchemaSchema
>;

export type ManifestSearchVersionSchema = z.infer<
  typeof ManifestSearchVersionSchemaSchema
>;

export type ManifestSchemaVersion = z.infer<typeof ManifestSchemaVersionSchema>;

export type ManifestVersionSchema = z.infer<typeof ManifestVersionSchemaSchema>;
export type ManifestSingleResponse = z.infer<
  typeof ManifestSingleResponseSchemaSchema
>;

//CONVERSIONS
export const CreateManifestSearchVersionSchema = (
  version: ManifestSchemaVersion
): ManifestSearchVersionSchema => {
  return {
    PackageVersion: version.PackageVersion,
    Channel: version.Channel,
    PackageFamilyNames: [version.Installers?.at(0)?.PackageFamilyName ?? ""],
    ProductCodes: [
      version.Installers?.at(0)?.ProductCode ??
        "Should probably do something with this",
    ],
  };
};

export const CreateManifestSearchResponseSchema = (
  packageManifest: PackageManifest
): ManifestSearchReponseSchema => {
  let versions = packageManifest.Versions?.map((v) =>
    CreateManifestSearchVersionSchema(v)
  );

  return {
    PackageIdentifier: packageManifest.PackageIdentifier,
    PackageName:
      packageManifest.Versions?.at(0)?.DefaultLocale.PackageName ?? "",
    Publisher: packageManifest.Versions?.at(0)?.DefaultLocale.Publisher ?? "",
    Versions: versions,
  };
};

export const CreateManifestVersionSchema = (
  version: ManifestSchemaVersion
): ManifestVersionSchema => {
  return {
    PackageVersion: version.PackageVersion,
    DefaultLocale: version.DefaultLocale,
    Channel: version.Channel,
    Locales: version.Locales,
    Installers: version.Installers,
  };
};

export const CreatePackageManifestForSingleResponse = (
  packageManifest: PackageManifest
): PackageManifest => {
  let versions = packageManifest.Versions?.map((v) =>
    CreateManifestVersionSchema(v)
  );

  return {
    PackageIdentifier: packageManifest.PackageIdentifier,
    Versions: versions,
  };
};
