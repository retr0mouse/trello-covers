export class TrelloAPI{
    static async getMember(trelloKey: string, trelloToken: string): Promise<TrelloMember> {
        const response = await fetch(`http://localhost:3000/members/?trelloToken=${trelloToken}&trelloKey=${trelloKey}`);
        if(!response.ok){
            throw new Error("Request failed with status code " + response.status);
        }
        const result = await response.json() as TrelloMember;
        return result;
    }

    static async getBoards(memberId: string, trelloKey: string, trelloToken: string): Promise<BoardsResponse> {
        const response = await fetch(`http://localhost:3000/boards?memberId=${memberId}&trelloKey=${trelloKey}&trelloToken=${trelloToken}`);
        if(!response.ok){
            throw new Error("Request failed with status code " + response.status);
        }
        const result = await response.json() as BoardsResponse;
        return result;
    }

    static async getCards(selectedBoardId: string, trelloKey: string, trelloToken: string): Promise<Cards> {
        const response = await fetch(`http://localhost:3000/cards?selectedBoardId=${selectedBoardId}&trelloKey=${trelloKey}&trelloToken=${trelloToken}`);
        if(!response.ok){
            throw new Error("Request failed with status code " + response.status);
        }
        const result = await response.json() as Cards;
        return result;

    }

    static async addAttachment(selectedCardId: string, trelloKey: string, trelloToken: string, imageUrl: string) {
        const response = await fetch(`http://localhost:3000/attachment?url=${encodeURIComponent(imageUrl)}&selectedCardId=${selectedCardId}&trelloKey=${trelloKey}&trelloToken=${trelloToken}`, {
            method: 'GET',
        });
        
        if (!response.ok) {
            throw new Error("Request failed with status code " + response.status);
        }
    }
}

// Member interfaces
interface TrelloMember {
  id: string;
  isAaMastered: boolean;
  aaId: string;
  activityBlocked: boolean;
  avatarHash?: any;
  avatarUrl?: any;
  bio: string;
  bioData?: any;
  confirmed: boolean;
  fullName: string;
  idMemberReferrer?: any;
  idPremOrgsAdmin: any[];
  initials: string;
  memberType: string;
  nonPublic: NonPublic;
  nonPublicAvailable: boolean;
  products: any[];
  url: string;
  username: string;
  status: string;
  aaBlockSyncUntil?: any;
  aaEmail?: any;
  aaEnrolledDate?: any;
  avatarSource: string;
  credentialsRemovedCount: number;
  domainClaimed?: any;
  email: string;
  goldSunsetFreeTrialIdOrganization?: any;
  gravatarHash: string;
  idBoards: string[];
  idOrganizations: string[];
  idEnterprisesAdmin: any[];
  loginTypes: string[];
  marketingOptIn: MarketingOptIn;
  messagesDismissed: MessagesDismissed[];
  oneTimeMessagesDismissed: string[];
  prefs: Prefs;
  trophies: any[];
  uploadedAvatarHash?: any;
  uploadedAvatarUrl?: any;
  premiumFeatures: string[];
  idEnterprise?: any;
  idEnterprisesDeactivated: any[];
  ixUpdate: string;
  limits: Limits;
}

interface Limits {
  boards: Boards;
  orgs: Boards;
}

interface Boards {
  totalPerMember: TotalPerMember;
}

interface TotalPerMember {
  status: string;
  disableAt: number;
  warnAt: number;
}

interface Prefs {
  privacy: Privacy;
  sendSummaries: boolean;
  minutesBetweenSummaries: number;
  minutesBeforeDeadlineToNotify: number;
  colorBlind: boolean;
  locale: string;
}

interface Privacy {
  fullName: string;
  avatar: string;
}

interface MessagesDismissed {
  _id: string;
  name: string;
  count: number;
  lastDismissed: string;
}

interface MarketingOptIn {
  optedIn: boolean;
  date: string;
}

interface NonPublic {
}

// Boards interfaces
interface BoardsResponse {
  name: string;
  desc: string;
  descData?: any;
  closed: boolean;
  dateClosed?: any;
  idOrganization: string;
  idEnterprise?: any;
  limits?: any;
  pinned?: any;
  shortLink: string;
  powerUps: any[];
  dateLastActivity: string;
  idTags: any[];
  datePluginDisable?: any;
  creationMethod?: string;
  ixUpdate?: any;
  enterpriseOwned: boolean;
  idBoardSource?: any;
  idMemberCreator: string;
  id: string;
  starred: boolean;
  url: string;
  prefs: Prefs;
  subscribed: boolean;
  labelNames: LabelNames;
  dateLastView: string;
  shortUrl: string;
  templateGallery?: any;
  premiumFeatures: string[];
  memberships: Membership[];
}

interface Membership {
  id: string;
  idMember: string;
  memberType: string;
  unconfirmed: boolean;
  deactivated: boolean;
}

interface LabelNames {
  green: string;
  yellow: string;
  orange: string;
  red: string;
  purple: string;
  blue: string;
  sky: string;
  lime: string;
  pink: string;
  black: string;
}

interface Prefs {
  permissionLevel: string;
  hideVotes: boolean;
  voting: string;
  comments: string;
  invitations: string;
  selfJoin: boolean;
  cardCovers: boolean;
  isTemplate: boolean;
  cardAging: string;
  calendarFeedEnabled: boolean;
  hiddenPluginBoardButtons: any[];
  background: string;
  backgroundColor?: any;
  backgroundImage: string;
  backgroundImageScaled: BackgroundImageScaled[];
  backgroundTile: boolean;
  backgroundBrightness: string;
  backgroundBottomColor: string;
  backgroundTopColor: string;
  canBePublic: boolean;
  canBeEnterprise: boolean;
  canBeOrg: boolean;
  canBePrivate: boolean;
  canInvite: boolean;
}

interface BackgroundImageScaled {
  width: number;
  height: number;
  url: string;
}

// Cards interfaces

export interface Cards {
  length: any;
  filter: any;
  id: string;
  checkItemStates?: any;
  closed: boolean;
  dateLastActivity: string;
  desc: string;
  descData?: DescDatum;
  dueReminder?: number;
  idBoard: string;
  idList: string;
  idMembersVoted: any[];
  idShort: number;
  idAttachmentCover?: string;
  idLabels: string[];
  manualCoverAttachment: boolean;
  name: string;
  pos: number;
  shortLink: string;
  isTemplate: boolean;
  cardRole?: any;
  badges: Badges;
  dueComplete: boolean;
  due?: any;
  idChecklists: string[];
  idMembers: any[];
  labels: Label[];
  shortUrl: string;
  start?: any;
  subscribed: boolean;
  url: string;
  cover: Cover;
}

interface Cover {
  idAttachment?: string;
  color?: any;
  idUploadedBackground?: any;
  size: string;
  brightness: string;
  idPlugin?: any;
}

interface Label {
  id: string;
  idBoard: string;
  name: string;
  color: string;
}

interface Badges {
  attachmentsByType: AttachmentsByType;
  location: boolean;
  votes: number;
  viewingMemberVoted: boolean;
  subscribed: boolean;
  fogbugz: string;
  checkItems: number;
  checkItemsChecked: number;
  checkItemsEarliestDue?: any;
  comments: number;
  attachments: number;
  description: boolean;
  due?: any;
  dueComplete: boolean;
  start?: any;
}

interface AttachmentsByType {
  trello: Trello;
}

interface Trello {
  board: number;
  card: number;
}

interface DescDatum {
  emoji: Emoji;
}

interface Emoji {
} 
