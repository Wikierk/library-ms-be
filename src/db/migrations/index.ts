import { InitMigration1735574137063 } from './1735574137063-initMigration';
import { AddIdToBook1735838471382 } from './1735838471382-addIdToBook';
import { ChangeTypeOfBookIdToString1735838704786 } from './1735838704786-changeTypeOfBookIdToString';
import { ChangeIsbnTONormalColumn1735838944063 } from './1735838944063-changeIsbnTONormalColumn';
import { ChangeIsbnToIdInBookRelations1735848839749 } from './1735848839749-changeIsbnToIdInBookRelations';
import { ChangeIdsTypeToString1735850951353 } from './1735850951353-changeIdsTypeToString';
import { FixReaderEntity1735853448078 } from './1735853448078-FixReaderEntity';
import { AddReturnDateColumnToBorrowings1735925104482 } from './1735925104482-AddReturnDateColumnToBorrowings';
import { AddCoverImageToBookEntity1735995065986 } from './1735995065986-AddCoverImageToBookEntity';
import { AddedCascadeDelete1736543815449 } from './1736543815449-AddedCascadeDelete';

require('dotenv').config();
export default [
  InitMigration1735574137063,
  AddIdToBook1735838471382,
  ChangeTypeOfBookIdToString1735838704786,
  ChangeIsbnTONormalColumn1735838944063,
  ChangeIsbnToIdInBookRelations1735848839749,
  ChangeIdsTypeToString1735850951353,
  FixReaderEntity1735853448078,
  AddReturnDateColumnToBorrowings1735925104482,
  AddCoverImageToBookEntity1735995065986,
  AddedCascadeDelete1736543815449,
];
