export enum Taxability
{
    Undefined,
    Taxable,
    Exempt,
    NilRated
}

export enum SupplyType
{
    Goods,
    Services
}

export const enum Filter {
	None,
	EqualTo,
	BeginsWith
}

export const enum Sort {
	None,
	Key,
	Value,
	SearchKey,
	ForeignKey
}

export const enum Status {
	Success = 0,
	Failure = -1
}

export const enum DatabaseOperation {
    None,
    Select,
	Insert,
	Delete,
	Update	
}

export const enum ErrorCode {
	KEY_IS_EMPTY = 105,
	KEY_NOT_VALID = 106,
	KEY_NOT_FOUND = 101,
	INSERT_FAILED = 102,
	DELETE_FAILED = 103,
	UPDATE_FAILED = 104
}

export const enum Event {
	None,
	Login,
	Logout
}