type InformationResponse = {
  Data: {
    SourceIdentifier: string;
    SourceAgreements?: {
      AgreementsIdentifier: string;
      Agreements?: {
        AgreementLabel?: string;
        Agreement?: string;
        AgreementUrl?: string;
      }[];
    };
    ServerSupportedVersions: string[];
    UnsupportedPackageMatchFields?: string[];
    RequiredPackageMatchFields?: string[];
    UnsupportedQueryParameters?: string[];
    RequiredQueryParameters?: string[];
  };
  ContinuationToken: string;
};
