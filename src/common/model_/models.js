/*
该文件属于自动生成,请勿手动修改
 */
import ArticleTag from "../model/article/ArticleTag"
import Base from "../model/base/Base"
import BaseEntity from "../model/base/BaseEntity"
import Filter from "../model/base/Filter"
import Pager from "../model/base/Pager"
import BoingPay from "../model/boingpay/BoingPay"
import BoingPayCashier from "../model/boingpay/cashier/BoingPayCashier"
import Captcha from "../model/common/Captcha"
import PhoneValidation from "../model/common/PhoneValidation"
import Company from "../model/company/Company"
import CompanyBranch from "../model/company/CompanyBranch"
import CompanyCore from "../model/company/CompanyCore"
import CompanyEquity from "../model/company/CompanyEquity"
import CompanyFinance from "../model/company/CompanyFinance"
import CompanyIntellectual from "../model/company/CompanyIntellectual"
import CompanyIntellectualInformation from "../model/company/CompanyIntellectualInformation"
import CompanyInvestment from "../model/company/CompanyInvestment"
import CompanyQualification from "../model/company/CompanyQualification"
import ConferenceRoom from "../model/conference/ConferenceRoom"
import ConferenceRoomReservation from "../model/conference/ConferenceRoomReservation"
import SpaceInvestment from "../model/demand/SpaceInvestment"
import SpaceRoomMessage from "../model/demand/SpaceRoomMessage"
import District from "../model/district/District"
import EntryApply from "../model/entry/apply/EntryApply"
import EntryApplyField from "../model/entry/apply/EntryApplyField"
import EntryApplyMember from "../model/entry/apply/EntryApplyMember"
import EntryApplySpace from "../model/entry/apply/EntryApplySpace"
import EntryBatch from "../model/entry/batch/EntryBatch"
import ExportMeta from "../model/export/meta/ExportMeta"
import FinanceBillReceipt from "../model/finance/FinanceBillReceipt"
import FinanceElectricPay from "../model/finance/FinanceElectricPay"
import FinanceOtherPay from "../model/finance/FinanceOtherPay"
import FinancePayInfo from "../model/finance/FinancePayInfo"
import FinanceStatement from "../model/finance/statement/FinanceStatement"
import FinanceStatementItem from "../model/finance/statement/FinanceStatementItem"
import FinanceStatementItemBill from "../model/finance/statement/FinanceStatementItemBill"
import FinanceStatementItemRent from "../model/finance/statement/FinanceStatementItemRent"
import GuardTest from "../model/guard/test/GuardTest"
import IndexManager from "../model/index/IndexManager"
import Investment from "../model/investment/Investment"
import InvestmentAssess from "../model/investment/InvestmentAssess"
import InvestmentCore from "../model/investment/InvestmentCore"
import InvestmentEquity from "../model/investment/InvestmentEquity"
import InvestmentFinance from "../model/investment/InvestmentFinance"
import InvestmentFinancing from "../model/investment/InvestmentFinancing"
import InvestmentHonor from "../model/investment/InvestmentHonor"
import InvestmentIntellectual from "../model/investment/InvestmentIntellectual"
import InvestmentPatentCopyright from "../model/investment/InvestmentPatentCopyright"
import InviteUser from "../model/invite/InviteUser"
import InviteVisitor from "../model/invite/InviteVisitor"
import DoorDisnetInform from "../model/ispace/door/DoorDisnetInform"
import ISpaceAlarmLog from "../model/ispace/door/ISpaceAlarmLog"
import ISpaceDoor from "../model/ispace/door/ISpaceDoor"
import ISpaceDoorLog from "../model/ispace/door/ISpaceDoorLog"
import ISpaceGrantAuthority from "../model/ispace/door/ISpaceGrantAuthority"
import ISpaceTaskInfo from "../model/ispace/door/ISpaceTaskInfo"
import EnergyPoint from "../model/ispace/energy/EnergyPoint"
import NetWork from "../model/ispace/network/NetWork"
import AddedPrint from "../model/ispace/print/AddedPrint"
import PrintHistory from "../model/ispace/print/PrintHistory"
import PrintInformation from "../model/ispace/print/PrintInformation"
import KeeperBusiness from "../model/keeper/business/KeeperBusiness"
import KeeperBusinessOrganization from "../model/keeper/business/KeeperBusinessOrganization"
import KeeperBusinessType from "../model/keeper/business/KeeperBusinessType"
import TableAdd from "../model/keeper/business/TableAdd"
import TableCell from "../model/keeper/business/TableCell"
import TypeProcess from "../model/keeper/business/TypeProcess"
import Menu from "../model/lover/Menu"
import Scenery from "../model/lover/Scenery"
import MakerCard from "../model/maker/card/MakerCard"
import MakerCardMember from "../model/maker/card/MakerCardMember"
import MakerApartment from "../model/maker/MakerApartment"
import MakerCarousel from "../model/maker/MakerCarousel"
import MakerHotel from "../model/maker/MakerHotel"
import MakerMarket from "../model/maker/MakerMarket"
import MakerOrganization from "../model/maker/MakerOrganization"
import MakerSimpleApply from "../model/maker/MakerSimpleApply"
import MakerSport from "../model/maker/MakerSport"
import MeetingRecord from "../model/meeting/MeetingRecord"
import MeetingRoom from "../model/meeting/MeetingRoom"
import MessageAnnouncement from "../model/message/announcement/MessageAnnouncement"
import MessageContactGroup from "../model/message/contact/group/MessageContactGroup"
import MessageContact from "../model/message/contact/MessageContact"
import MessageLetter from "../model/message/letter/MessageLetter"
import MessageManager from "../model/message/MessageManager"
import MessageNotify from "../model/message/notify/MessageNotify"
import MessageRemind from "../model/message/remind/MessageRemind"
import Notification from "../model/notification/Notification"
import Office from "../model/office/Office"
import OfficialActivity from "../model/official/OfficialActivity"
import OfficialActivityApply from "../model/official/OfficialActivityApply"
import OfficialArticle from "../model/official/OfficialArticle"
import OfficialArticleTag from "../model/official/OfficialArticleTag"
import OfficialCarousel from "../model/official/OfficialCarousel"
import OfficialHelp from "../model/official/OfficialHelp"
import OfficialPolicy from "../model/official/OfficialPolicy"
import OfficialPolicyArea from "../model/official/OfficialPolicyArea"
import OfficialPolicyQuery from "../model/official/OfficialPolicyQuery"
import OfficialPolicyTag from "../model/official/OfficialPolicyTag"
import OfficialStar from "../model/official/OfficialStar"
import ParkingApply from "../model/parking/ParkingApply"
import OnlinePay from "../model/pay/OnlinePay"
import Preference from "../model/preference/Preference"
import CreatePrintTest from "../model/print/CreatePrintTest"
import DevicePrintTest from "../model/print/DevicePrintTest"
import DeviceTest from "../model/print/DeviceTest"
import PrintTest from "../model/print/PrintTest"
import UpdatePrintResult from "../model/print/UpdatePrintResult"
import ProjectAdministratorInvitation from "../model/project/administrator/invitation/ProjectAdministratorInvitation"
import ProjectAdministrator from "../model/project/administrator/ProjectAdministrator"
import Project from "../model/project/Project"
import ProjectFinancing from "../model/project/ProjectFinancing"
import ProjectMember from "../model/project/ProjectMember"
import ProjectMentor from "../model/project/ProjectMentor"
import ProtocolIncubator from "../model/protocol/incubator/ProtocolIncubator"
import ProtocolSpace from "../model/protocol/space/ProtocolSpace"
import Reception from "../model/reception/Reception"
import Dragx from "../model/space/Dragx"
import SpaceApply from "../model/space/SpaceApply"
import SpaceBuilding from "../model/space/SpaceBuilding"
import SpaceDoorLog from "../model/space/SpaceDoorLog"
import SpaceRegional from "../model/space/SpaceRegional"
import SpaceRoom from "../model/space/SpaceRoom"
import SpaceSeat from "../model/space/SpaceSeat"
import SummaryAnalysis from "../model/summary/analysis/SummaryAnalysis"
import SummaryAnalysisResult from "../model/summary/analysis/SummaryAnalysisResult"
import Summary from "../model/summary/Summary"
import SummaryAttribute from "../model/summary/SummaryAttribute"
import Survey from "../model/survey/Survey"
import SurveyAnswer from "../model/survey/SurveyAnswer"
import SurveyChoice from "../model/survey/SurveyChoice"
import SurveyComponent from "../model/survey/SurveyComponent"
import SurveyGroup from "../model/survey/SurveyGroup"
import SurveyInput from "../model/survey/SurveyInput"
import SurveyQuestion from "../model/survey/SurveyQuestion"
import Tank from "../model/tank/Tank"
import Teamwork from "../model/teamwork/Teamwork"
import TeamworkTag from "../model/teamwork/TeamworkTag"
import Attribute from "../model/template/Attribute"
import Template from "../model/template/Template"
import Torch2017 from "../model/torch/Torch2017"
import Torch2018 from "../model/torch/Torch2018"
import UserAccess from "../model/user/access/UserAccess"
import AccessColumn from "../model/user/AccessColumn"
import UserFeature from "../model/user/feature/UserFeature"
import Feedback from "../model/user/feedback/Feedback"
import UserModule from "../model/user/module/UserModule"
import UserRole from "../model/user/role/UserRole"
import User from "../model/user/User"
import UserDoorLog from "../model/user/UserDoorLog"
import UserNode from "../model/user/UserNode"

let models = {
  ArticleTag: ArticleTag,
  Base: Base,
  BaseEntity: BaseEntity,
  Filter: Filter,
  Pager: Pager,
  BoingPay: BoingPay,
  BoingPayCashier: BoingPayCashier,
  Captcha: Captcha,
  PhoneValidation: PhoneValidation,
  Company: Company,
  CompanyBranch: CompanyBranch,
  CompanyCore: CompanyCore,
  CompanyEquity: CompanyEquity,
  CompanyFinance: CompanyFinance,
  CompanyIntellectual: CompanyIntellectual,
  CompanyIntellectualInformation: CompanyIntellectualInformation,
  CompanyInvestment: CompanyInvestment,
  CompanyQualification: CompanyQualification,
  ConferenceRoom: ConferenceRoom,
  ConferenceRoomReservation: ConferenceRoomReservation,
  SpaceInvestment: SpaceInvestment,
  SpaceRoomMessage: SpaceRoomMessage,
  District: District,
  EntryApply: EntryApply,
  EntryApplyField: EntryApplyField,
  EntryApplyMember: EntryApplyMember,
  EntryApplySpace: EntryApplySpace,
  EntryBatch: EntryBatch,
  ExportMeta: ExportMeta,
  FinanceBillReceipt: FinanceBillReceipt,
  FinanceElectricPay: FinanceElectricPay,
  FinanceOtherPay: FinanceOtherPay,
  FinancePayInfo: FinancePayInfo,
  FinanceStatement: FinanceStatement,
  FinanceStatementItem: FinanceStatementItem,
  FinanceStatementItemBill: FinanceStatementItemBill,
  FinanceStatementItemRent: FinanceStatementItemRent,
  GuardTest: GuardTest,
  IndexManager: IndexManager,
  Investment: Investment,
  InvestmentAssess: InvestmentAssess,
  InvestmentCore: InvestmentCore,
  InvestmentEquity: InvestmentEquity,
  InvestmentFinance: InvestmentFinance,
  InvestmentFinancing: InvestmentFinancing,
  InvestmentHonor: InvestmentHonor,
  InvestmentIntellectual: InvestmentIntellectual,
  InvestmentPatentCopyright: InvestmentPatentCopyright,
  InviteUser: InviteUser,
  InviteVisitor: InviteVisitor,
  DoorDisnetInform: DoorDisnetInform,
  ISpaceAlarmLog: ISpaceAlarmLog,
  ISpaceDoor: ISpaceDoor,
  ISpaceDoorLog: ISpaceDoorLog,
  ISpaceGrantAuthority: ISpaceGrantAuthority,
  ISpaceTaskInfo: ISpaceTaskInfo,
  EnergyPoint: EnergyPoint,
  NetWork: NetWork,
  AddedPrint: AddedPrint,
  PrintHistory: PrintHistory,
  PrintInformation: PrintInformation,
  KeeperBusiness: KeeperBusiness,
  KeeperBusinessOrganization: KeeperBusinessOrganization,
  KeeperBusinessType: KeeperBusinessType,
  TableAdd: TableAdd,
  TableCell: TableCell,
  TypeProcess: TypeProcess,
  Menu: Menu,
  Scenery: Scenery,
  MakerCard: MakerCard,
  MakerCardMember: MakerCardMember,
  MakerApartment: MakerApartment,
  MakerCarousel: MakerCarousel,
  MakerHotel: MakerHotel,
  MakerMarket: MakerMarket,
  MakerOrganization: MakerOrganization,
  MakerSimpleApply: MakerSimpleApply,
  MakerSport: MakerSport,
  MeetingRecord: MeetingRecord,
  MeetingRoom: MeetingRoom,
  MessageAnnouncement: MessageAnnouncement,
  MessageContactGroup: MessageContactGroup,
  MessageContact: MessageContact,
  MessageLetter: MessageLetter,
  MessageManager: MessageManager,
  MessageNotify: MessageNotify,
  MessageRemind: MessageRemind,
  Notification: Notification,
  Office: Office,
  OfficialActivity: OfficialActivity,
  OfficialActivityApply: OfficialActivityApply,
  OfficialArticle: OfficialArticle,
  OfficialArticleTag: OfficialArticleTag,
  OfficialCarousel: OfficialCarousel,
  OfficialHelp: OfficialHelp,
  OfficialPolicy: OfficialPolicy,
  OfficialPolicyArea: OfficialPolicyArea,
  OfficialPolicyQuery: OfficialPolicyQuery,
  OfficialPolicyTag: OfficialPolicyTag,
  OfficialStar: OfficialStar,
  ParkingApply: ParkingApply,
  OnlinePay: OnlinePay,
  Preference: Preference,
  CreatePrintTest: CreatePrintTest,
  DevicePrintTest: DevicePrintTest,
  DeviceTest: DeviceTest,
  PrintTest: PrintTest,
  UpdatePrintResult: UpdatePrintResult,
  ProjectAdministratorInvitation: ProjectAdministratorInvitation,
  ProjectAdministrator: ProjectAdministrator,
  Project: Project,
  ProjectFinancing: ProjectFinancing,
  ProjectMember: ProjectMember,
  ProjectMentor: ProjectMentor,
  ProtocolIncubator: ProtocolIncubator,
  ProtocolSpace: ProtocolSpace,
  Reception: Reception,
  Dragx: Dragx,
  SpaceApply: SpaceApply,
  SpaceBuilding: SpaceBuilding,
  SpaceDoorLog: SpaceDoorLog,
  SpaceRegional: SpaceRegional,
  SpaceRoom: SpaceRoom,
  SpaceSeat: SpaceSeat,
  SummaryAnalysis: SummaryAnalysis,
  SummaryAnalysisResult: SummaryAnalysisResult,
  Summary: Summary,
  SummaryAttribute: SummaryAttribute,
  Survey: Survey,
  SurveyAnswer: SurveyAnswer,
  SurveyChoice: SurveyChoice,
  SurveyComponent: SurveyComponent,
  SurveyGroup: SurveyGroup,
  SurveyInput: SurveyInput,
  SurveyQuestion: SurveyQuestion,
  Tank: Tank,
  Teamwork: Teamwork,
  TeamworkTag: TeamworkTag,
  Attribute: Attribute,
  Template: Template,
  Torch2017: Torch2017,
  Torch2018: Torch2018,
  UserAccess: UserAccess,
  AccessColumn: AccessColumn,
  UserFeature: UserFeature,
  Feedback: Feedback,
  UserModule: UserModule,
  UserRole: UserRole,
  User: User,
  UserDoorLog: UserDoorLog,
  UserNode: UserNode
};
export default models
