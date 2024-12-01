import _win32typing

def AfxOleInit(enabled, /) -> None: ...
def CreateInsertDialog() -> _win32typing.PyCOleInsertDialog: ...
def CreateOleClientItem() -> _win32typing.PyCOleClientItem: ...
def CreateOleDocument(template: _win32typing.PyCDocTemplate, fileName: str | None = ..., /) -> _win32typing.PyCOleDocument: ...
def DaoGetEngine() -> _win32typing.PyIDispatch: ...
def GetIDispatchForWindow(Wnd, /) -> _win32typing.PyIDispatch: ...
def OleGetUserCtrl(): ...
def OleSetUserCtrl(bUserCtrl, /): ...
def SetMessagePendingDelay(delay, /) -> None: ...
def EnableNotRespondingDialog(enabled, /) -> None: ...
def EnableBusyDialog(*args): ...  # incomplete

COleClientItem_activeState: int
COleClientItem_activeUIState: int
COleClientItem_emptyState: int
COleClientItem_loadedState: int
COleClientItem_openState: int
OLE_CHANGED: int
OLE_CHANGED_ASPECT: int
OLE_CHANGED_STATE: int
OLE_CLOSED: int
OLE_RENAMED: int
OLE_SAVED: int
