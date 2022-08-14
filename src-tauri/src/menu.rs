use tauri::{AboutMetadata, Menu, MenuItem, Submenu};

// macOS only
pub(crate) fn menu() -> Menu {
    let about_menu = AboutMetadata::new()
        .version(String::from("0.1.0"))
        .authors(vec![String::from("Aris Ripandi")])
        .comments(String::from("Open Source two factor authenticator"))
        .copyright(String::from("Apache-2.0 License"))
        .license(String::from("Apache-2.0 License"))
        .website(String::from("https://otentik.app/authenticator"))
        .website_label(String::from("Homepage"));

    Menu::new()
        .add_submenu(Submenu::new(
            "Authenticator",
            Menu::new()
                .add_native_item(MenuItem::About("Authenticator".to_string(), about_menu))
                .add_native_item(MenuItem::Separator)
                .add_native_item(MenuItem::Quit),
        ))
        // .add_submenu(Submenu::new(
        //     "Edit",
        //     Menu::new()
        //         .add_native_item(MenuItem::Undo)
        //         .add_native_item(MenuItem::Redo)
        //         .add_native_item(MenuItem::Separator)
        //         .add_native_item(MenuItem::Cut)
        //         .add_native_item(MenuItem::Copy)
        //         .add_native_item(MenuItem::Paste)
        //         .add_native_item(MenuItem::SelectAll),
        // ))
}
