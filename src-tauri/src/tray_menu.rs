use tauri::{CustomMenuItem, SystemTrayMenu, SystemTrayMenuItem};

// macOS only
pub(crate) fn tray_menu() -> SystemTrayMenu {
    let open = CustomMenuItem::new("open".to_string(), "Open Authenticator");
    let quit = CustomMenuItem::new("quit".to_string(), "Quit Authenticator");
    let preferences = CustomMenuItem::new("preferences".to_string(), "Preferences");

    SystemTrayMenu::new()
        .add_item(open)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(preferences)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(quit)
}
