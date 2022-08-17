extern crate bcrypt;

use bcrypt::{hash, verify, DEFAULT_COST};
use magic_crypt::{new_magic_crypt, MagicCryptTrait};

#[tauri::command]
pub(crate) async fn encrypt_str(plain_str: String, passphrase: String) -> String {
    let mc = new_magic_crypt!(passphrase, 256);
    let encrypted = mc.encrypt_str_to_base64(plain_str);
    encrypted.into()
}

#[tauri::command]
pub(crate) async fn decrypt_str(encrypted_str: String, passphrase: String) -> String {
    let mc = new_magic_crypt!(passphrase, 256);
    let decrypted = mc.decrypt_base64_to_string(&encrypted_str).unwrap();
    decrypted.into()
}

#[tauri::command]
pub(crate) async fn create_hash(plaintext: String) -> String {
    let hashed = hash(plaintext, DEFAULT_COST).unwrap();
    hashed.into()
}

#[tauri::command]
pub(crate) async fn verify_hash(plaintext: String, hashed_str: String) -> bool {
    let valid = verify(plaintext, &hashed_str).unwrap();
    valid.into()
}
