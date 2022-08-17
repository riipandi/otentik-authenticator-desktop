use totp_rs::{Algorithm, Secret, TOTP};

#[tauri::command]
pub(crate) async fn generate_totp(secret: String, period: u64, digits: usize) -> String {
    let totp = TOTP::new(
        Algorithm::SHA1,
        digits,
        1,
        period,
        Secret::Encoded(secret).to_bytes().unwrap(),
    )
    .unwrap();
    let token = totp.generate_current().unwrap();

    // println!("{}", token);
    token.into()
}
