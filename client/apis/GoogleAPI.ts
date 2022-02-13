export class GoogleAPI {
  static async getBooks(name: string): Promise<BooksResponse> {
    const response = await fetch(`http://localhost:3000/books?title=${name}`);
    if (!response.ok) {
      throw new Error("Request failed with status code " + response.status);
    }
    const result = await response.json() as BooksResponse;
    return result;
  }
}

interface BooksResponse {
  kind: string;
  totalItems: number;
  items: Item[];
}

interface Item {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
  saleInfo: SaleInfo;
  accessInfo: AccessInfo;
  searchInfo?: SearchInfo;
}

interface SearchInfo {
  textSnippet: string;
}

interface AccessInfo {
  country: string;
  viewability: string;
  embeddable: boolean;
  publicDomain: boolean;
  textToSpeechPermission: string;
  epub: Epub;
  pdf: Epub;
  webReaderLink: string;
  accessViewStatus: string;
  quoteSharingAllowed: boolean;
}

interface Epub {
  isAvailable: boolean;
  acsTokenLink?: string;
}

interface SaleInfo {
  country: string;
  saleability: string;
  isEbook: boolean;
  listPrice?: ListPrice;
  retailPrice?: ListPrice;
  buyLink?: string;
  offers?: Offer[];
}

interface Offer {
  finskyOfferType: number;
  listPrice: ListPrice2;
  retailPrice: ListPrice2;
}

interface ListPrice2 {
  amountInMicros: number;
  currencyCode: string;
}

interface ListPrice {
  amount: number;
  currencyCode: string;
}

interface VolumeInfo {
  title: string;
  subtitle?: string;
  authors: string[];
  publisher?: string;
  publishedDate: string;
  description: string;
  industryIdentifiers: IndustryIdentifier[];
  readingModes: ReadingModes;
  pageCount: number;
  printType: string;
  categories: string[];
  averageRating?: number;
  ratingsCount?: number;
  maturityRating: string;
  allowAnonLogging: boolean;
  contentVersion: string;
  panelizationSummary: PanelizationSummary;
  imageLinks: ImageLinks;
  language: string;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
  seriesInfo?: SeriesInfo;
}

interface SeriesInfo {
  kind: string;
  shortSeriesBookTitle?: string;
  bookDisplayNumber: string;
  volumeSeries: VolumeSery[];
}

interface VolumeSery {
  seriesId: string;
  seriesBookType: string;
  orderNumber: number;
}

interface ImageLinks {
  smallThumbnail: string;
  thumbnail: string;
}

interface PanelizationSummary {
  containsEpubBubbles: boolean;
  containsImageBubbles: boolean;
}

interface ReadingModes {
  text: boolean;
  image: boolean;
}

interface IndustryIdentifier {
  type: string;
  identifier: string;
}
