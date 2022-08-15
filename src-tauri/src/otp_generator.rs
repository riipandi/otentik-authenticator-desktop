use totp_rs::{Algorithm, TOTP, Secret};

#[tauri::command]
pub(crate) fn generate_totp(secret: String, period: u64, digits: usize) -> String {
    let totp = TOTP::new(
        Algorithm::SHA1,
        digits,
        1,
        period,
        Secret::Raw(secret.as_bytes().to_vec()).to_bytes().unwrap(),
    ).unwrap();

    let token = totp.generate_current().unwrap();

    // println!("{}", token);
    token.into()
}
