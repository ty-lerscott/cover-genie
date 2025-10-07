import { NextResponse } from 'next/server';

import supabase from '@/lib/supabase';
import { GenericBody } from '../types/body';

type UserCreatedBody = GenericBody<{
    backup_code_enabled: boolean;
    banned: boolean;
    create_organization_enabled: boolean;
    created_at: boolean;
    delete_self_enabled: boolean;
    email_addresses: {
        created_at: number,
        email_address: string,
        id: string,
        linked_to: [
            {
                id: string,
                type: string
            }
        ],
        matches_sso_connection: boolean,
        object: string,
        reserved: boolean,
        updated_at: number,
        verification: {
            attempts: number | null,
            expire_at: number | null,
            object: string,
            status: string,
            strategy: string
        }
    }[],
    enterprise_accounts: [],
    external_accounts: {
        approved_scopes: string;
        avatar_url: string;
        created_at: number;
        email_address: string;
        external_account_id: string;
        family_name: string;
        first_name: string;
        given_name: string;
        google_id: string;
        id: string;
        identification_id: string;
        image_url: string;
        label: null;
        last_name: string;
        object: string;
        picture: string;
        provider: string;
        provider_user_id: string;
        public_metadata:{};
        updated_at: number;
        username: string | null;
        verification: {
            attempts: number | string;
            expire_at: number;
            object: string;
            status: string;
            strategy: string;
        }
    }[],
    external_id: string | null;
    first_name: string;
    has_image: boolean;
    id: string;
    image_url: string;
    last_active_at: number;
    last_name: string;
    last_sign_in_at: null;
    legal_accepted_at: null;
    locked: boolean;
    lockout_expires_in_seconds: null;
    mfa_disabled_at: null;
    mfa_enabled_at: null;
    object: string;
    passkeys: [];
    password_enabled: boolean;
    phone_numbers: [];
    primary_email_address_id: string;
    primary_phone_number_id: null;
    primary_web3_wallet_id: null;
    private_metadata: {};
    profile_image_url: string;
    public_metadata: {};
    saml_accounts: [];
    totp_enabled: boolean;
    two_factor_enabled: boolean;
    unsafe_metadata: {};
    updated_at: number;
    username: string | null;
    verification_attempts_remaining: number;
    web3_wallets: [];
}, 'user.created'>

const userCreatedHook = async (requestBody: UserCreatedBody) => {
    const { id: user_id } = requestBody.data;

    const { error } = await supabase
        .from('users')
        .insert([{ user_id }]);

    if (error) {
        console.error('Error inserting user:', error);
        return NextResponse.json({ message: 'Error inserting user' }, { status: 500 });
    }

    return NextResponse.json({ message: 'User created' });
}

export default userCreatedHook;