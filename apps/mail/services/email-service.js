import { utilService } from "../../../services/util.service.js";
import { storageService } from "../../../services/storage.service.js";

export const mailService = {
  createEmail,
  query,
  getEmailById,
  removeEmail,
  pushMail,
  saveMails,
  loadMails,
};
const KEY = "emailDB";

const loggedinUser = {
  email: "user@appsus.com",
  fullname: "Mahatma Appsus",
  name: "Mahatma Appsus",
};

const gEmails = [
  {
    id: "e101",
    subject: "I dont Miss you!",
    body: "Would not love to catch up sometimes",
    isRead: false,
    sentAt: 1551133930594,
    isStarred: false,
    isOpen: false,
    to: "momo@momo.com",
    isTrash: false,
    from: "asd@appsus.com",
    name: "Mahatma Appsus",
  },
  {
    id: "e102",
    subject: "Verify your account",
    body: "Were almost done. Your account is created. Now you just need to verify it",
    isRead: false,
    sentAt: 1551133930594,
    isStarred: false,
    isOpen: false,
    to: "momo@momo.com",
    isTrash: false,
    from: "they@appsus.com",
    name: "Donald Trump",
  },
  {
    id: "e103",
    subject: "Free Items",
    body: "This is the nigerian prince, i offer you 5 milion dollars for free sir",
    isRead: false,
    sentAt: 1551133930594,
    isStarred: false,
    isOpen: false,
    to: "momo@momo.com",
    isTrash: false,
    from: "has@appsus.com",
    name: "Elon Musk",
  },
  {
    id: "e104",
    subject: "Scam",
    body: "This is a scam",
    isRead: false,
    sentAt: 1551133930594,
    isStarred: false,
    isOpen: false,
    to: "momo@momo.com",
    isTrash: false,
    from: "hey@appsus.com",
    name: "Gandhi",
  },
  {
    id: "e105",
    subject: "Not a scam?",
    body: "This is not a scam Specific pricing and discounts may be subject to change. Please check the Steam store page for details You are receiving this email because the above item is on your Steam Wishlist",
    isRead: false,
    sentAt: 1551133930594,
    isStarred: false,
    isOpen: false,
    to: "muki@bendavid.com",
    isTrash: false,
    from: "hey@appsus.com",
    name: "Amit Misken",
  },
  {
    id: "e109",
    subject: "Hey",
    body: "This is the nigerian prince, i offer you 5 milion dollars for free sir",
    isRead: false,
    sentAt: 1551133930594,
    isStarred: false,
    isOpen: false,
    to: "momo@momo.com",
    isTrash: false,
    from: "has@appsus.com",
    name: "Avi Ron",
  },
  {
    id: "e149",
    subject: "Free Jeweels",
    body: "This is the nigerian prince, i offer you 5 milion dollars for free sir",
    isRead: false,
    sentAt: 1551133930594,
    isStarred: false,
    isOpen: false,
    to: "momo@momo.com",
    isTrash: false,
    from: "has@appsus.com",
    name: "Mimi Cohen",
  },
  {
    id: "e159",
    subject: "You won a green card!",
    body: "This is the nigerian prince, i offer you 5 milion dollars for free sir",
    isRead: false,
    sentAt: 1551133930594,
    isStarred: false,
    isOpen: false,
    to: "momo@momo.com",
    isTrash: false,
    from: "has@appsus.com",
    name: "Rami Levi",
  },
];

_saveToStorage(gEmails);

function createEmail(subject, body, to) {
  let emails = _loadFromStorage();
  const email = {
    name: `${loggedinUser.name}`,
    id: utilService.makeId(),
    subject,
    body,
    isRead: false,
    sentAt: new Date(),
    to,
    isStarred: false,
    isOpen: false,
    isTrash: false,
    from: loggedinUser.email,
  };
  emails.unshift(email);
  _saveToStorage(emails);
  console.log(email);
  return Promise.resolve();
}

function getEmailById(emailId) {
  const emails = _loadFromStorage();
  const email = emails.find((email) => emailId === email.id);
  return Promise.resolve(email);
}

function removeEmail(emailId) {
  let emails = _loadFromStorage();
  emails = emails.filter((email) => email.id !== emailId);
  _saveToStorage(emails);
  return Promise.resolve();
}

function pushMail(email) {
  let emails = _loadFromStorage();
  emails.unshift(email);
  _saveToStorage(emails);
  return Promise.resolve();
}

function _saveToStorage(emails) {
  storageService.saveToStorage(KEY, emails);
}

function _loadFromStorage() {
  return storageService.loadFromStorage(KEY);
}
function saveMails(mails) {
  _saveToStorage(mails);
}

function loadMails() {
  return _loadFromStorage();
}
function query(filterBy, folderFilter = 0) {
  let mails = _loadFromStorage();
  if (!mails) {
    mails = createEmail();
    _saveToStorage(mails);
  }

  if (folderFilter === 0 && !filterBy) {
    let notTrash = mails.filter((mail) => mail.isTrash === false);
    return Promise.resolve(notTrash);
  }
  switch (folderFilter) {
    case 1:
      let read = mails.filter(
        (mail) => mail.isRead === true && mail.isTrash === false
      );
      return Promise.resolve(read);
    case 2:
      let unread = mails.filter(
        (mail) => mail.isRead === false && mail.isTrash === false
      );
      return Promise.resolve(unread);
    case 3:
      let isStar = mails.filter(
        (mail) => mail.star === true && mail.isTrash === false
      );
      return Promise.resolve(isStar);

    case 4:
      let showTrash = mails.filter((mail) => mail.isTrash === true);
      return Promise.resolve(showTrash);
    case 5:
      {
        let sent = mails.filter(
          (mail) =>
            mail.from === `${loggedinUser.email}` && mail.isTrash === false
        );
        return Promise.resolve(sent);
      }
      break;
      return Promise.resolve(mails);
  }
  if (filterBy) {
    mails = mails.filter(
      (mail) =>
        mail.body.toLowerCase().includes(filterBy.filterSearch.toLowerCase()) ||
        mail.subject.toLowerCase().includes(filterBy.filterSearch.toLowerCase())
    );
    return Promise.resolve(mails);
  }

  if (!filterBy) {
    return Promise.resolve(mails);
  }
}
