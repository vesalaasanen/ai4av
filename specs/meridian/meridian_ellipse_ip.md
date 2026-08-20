---
spec_id: admin/meridian-ellipse
schema_version: ai4av-public-spec-v1
revision: 1
title: "Meridian Ellipse Control Spec"
manufacturer: Meridian
model_family: Ellipse
aliases: []
compatible_with:
  manufacturers:
    - Meridian
  models:
    - Ellipse
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - meridian-audio.com
source_urls:
  - https://www.meridian-audio.com/media/8d93d644a722762/meridian-automation-interface-for-ip-control-issue-4.pdf
retrieved_at: 2026-08-16T13:17:06.673Z
last_checked_at: 2026-08-19T09:34:46.279Z
generated_at: 2026-08-19T09:34:46.279Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document covers the \"218 and similar\" family (218, 251, 271, ID41); Ellipse is not named explicitly — model applicability assumed from input metadata"
  - "RS232 availability and serial configuration for the Ellipse specifically not stated; baud rate configurable per product, no value given"
  - "baud rate stated as configurable, no value given in source"
  - "no safety warnings or interlock procedures in source."
  - "RS232 serial parameters (baud rate stated as configurable, no value given; connector choice 9-pin D-type vs SpeakerLink is product-dependent)"
  - "Ellipse-specific firmware version and protocol version support not stated"
  - "full MSR command code list not enumerated in source — retrieve at runtime via \"#MSR help\""
verification:
  verdict: verified
  checked_at: 2026-08-19T09:34:46.279Z
  matched_actions: 36
  action_count: 36
  confidence: medium
  summary: "All 36 spec actions and queries appear verbatim in the refined source; transport (port 9014, raw TCP, LF termination) is directly documented. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-16
---

# Meridian Ellipse Control Spec

## Summary
Meridian Ellipse audio product controlled via the Meridian Automation Interface: human-readable, LF-terminated text messages over a raw TCP stream (port 9014). Covers commands, queries, and unsolicited status messages for source selection, volume, menu control, display blank, and system functions. The same protocol is also presented on RS232 by some products in this family (e.g. 218-class devices).

<!-- UNRESOLVED: source document covers the "218 and similar" family (218, 251, 271, ID41); Ellipse is not named explicitly — model applicability assumed from input metadata -->
<!-- UNRESOLVED: RS232 availability and serial configuration for the Ellipse specifically not stated; baud rate configurable per product, no value given -->

## Transport
```yaml
protocols:
  - tcp
  - serial  # mentioned in source ("Some products also make this available on RS232"); Ellipse-specific availability UNRESOLVED
addressing:
  port: 9014
serial:
  baud_rate: null  # UNRESOLVED: baud rate stated as configurable, no value given in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable    (standby via #MSR SB, wake via #SRC, reboot via #RBT)
# - routable     (logical source selection via #SRC x / #MSR xx)
# - queryable    (extensive query set: ?PID, ?PGS, ?AGS, ?MGV, ?MGF, ?MGR, ?MGB, ?GSL, ?DIS)
# - levelable    (volume via #SVN, menu values via #MVP/#MVM/#MSV)
```

## Actions
```yaml
# Message framing: all commands are ASCII strings terminated by LF ("\n" 0x0A); CR ignored.
# Commands (#) always provoke a reply: *ACK / *NAK / *ERR. State changes arrive separately as unsolicited (!) messages to all connected clients.
# Rate limit: commands received within 70ms of the previous are rejected (*ERR "Command sent too soon");
# commands between 70ms and 114ms are silently delayed until the 114ms timer expires.

- id: help
  label: Help
  kind: query
  command: "help"
  params: []
  notes: Replies with the full list of commands accepted by the product.

- id: ping
  label: Ping
  kind: action
  command: "#PNG"
  params: []
  notes: Replies *PNG. May originate from either UI or product; product sends #PNG after 5 idle minutes and closes TCP if no *PNG returned.

- id: dev_mode
  label: Development Mode
  kind: action
  command: "#DEV"
  params: []
  notes: Disables ping/auto-disconnect. Not stored; reverts to normal behaviour after reset. Should not be disabled in a customer unit.

- id: msr_emulation
  label: MSR Emulation
  kind: action
  command: "#MSR {code}"
  params:
    - name: code
      type: string
      description: MSR key code (same codes as the RS232 interface on G/800 series). Full list retrievable via "#MSR help".
  notes: Emulates Meridian System Remote keys.

- id: msr_help
  label: MSR Help
  kind: query
  command: "#MSR help"
  params: []
  notes: Replies with full list of MSR commands.

- id: msr_source_cd
  label: MSR Select CD Source
  kind: action
  command: "#MSR CD"
  params: []
  notes: Selects CD source if enabled; else *NAK "Source not enabled".

- id: msr_standby
  label: MSR Standby
  kind: action
  command: "#MSR SB"
  params: []
  notes: Puts unit into standby; followed by unsolicited !OFF to all connections.

- id: msr_volume_up
  label: MSR Volume Up
  kind: action
  command: "#MSR VP"
  params: []
  notes: Increases volume (unless in standby); leads to !VMU.

- id: msr_play
  label: MSR Play
  kind: action
  command: "#MSR PL"
  params: []
  notes: Source-device command; acknowledged, action depends on source status/configuration.

- id: msr_menu_prev
  label: MSR Menu Left (previous menu)
  kind: action
  command: "#MSR ML"
  params: []
  notes: Focus change leads to !MFC. Left/right change menu focus within 3s display window.

- id: msr_menu_next
  label: MSR Menu Right (next menu)
  kind: action
  command: "#MSR MR"
  params: []
  notes: Focus change leads to !MFC.

- id: msr_menu_value_up
  label: MSR Menu Up (increase value)
  kind: action
  command: "#MSR MP"
  params: []
  notes: Up/down always change the value of the menu in focus; leads to !MVC.

- id: msr_menu_value_down
  label: MSR Menu Down (decrease value)
  kind: action
  command: "#MSR MM"
  params: []
  notes: Leads to !MVC.

- id: msr_store_menus_begin
  label: MSR Store Menus (begin two-step)
  kind: action
  command: "#MSR SR"
  params: []
  notes: First send replies *ACK plus !TMP Display:"Store Menus?" Period:"3". Second send within 3 seconds stores settings and replies !TMP Display:"Menus stored" Period:"3".

- id: msr_clear_menus_begin
  label: MSR Clear Menus (begin two-step)
  kind: action
  command: "#MSR CL"
  params: []
  notes: First send replies *ACK plus !TMP Display:"Clear Menus?" Period:"3". Second send within 3 seconds clears settings to factory defaults and replies !TMP Display:"Menus cleared" Period:"3".

- id: menu_value_plus
  label: Menu Value Plus
  kind: action
  command: "#MVP {menu}"
  params:
    - name: menu
      type: string
      description: Menu name, e.g. Treble, Bass
  notes: Increases named menu value. *NAK "Menu not allowed" if Show:"No"; *ERR "Unknown menu" on bad name; *NAK "No source selected" if menus unavailable.

- id: menu_value_minus
  label: Menu Value Minus
  kind: action
  command: "#MVM {menu}"
  params:
    - name: menu
      type: string
      description: Menu name, e.g. Treble, Bass
  notes: Decreases named menu value. Same NAK/ERR behaviour as #MVP.

- id: menus_store
  label: Menus Store (immediate)
  kind: action
  command: "#MST"
  params: []
  notes: Stores all menu data to non-volatile memory immediately; replies *ACK then *TMP Display:"Menus Stored" Period:"3".

- id: menus_clear
  label: Menus Clear (immediate)
  kind: action
  command: "#MCL"
  params: []
  notes: Returns menus to factory settings in one step; replies *ACK then *TMP Display:"Menus cleared" Period:"3".

- id: menu_report_raw
  label: Menu Report Raw Values
  kind: action
  command: "#MRR on"
  params: []
  notes: Protocol version 2. Enables Raw field in unsolicited menu change messages on this connection.

- id: menu_set_value
  label: Menu Set Value
  kind: action
  command: "#MSV {menu} {raw}"
  params:
    - name: menu
      type: string
      description: Menu name, e.g. Treble
    - name: raw
      type: integer
      description: Signed integer raw value (e.g. Treble is in half-dB steps: 7 = +3.5dB)
  notes: Protocol version 2. Replies *ACK, then !MVC with new value (and Raw if #MRR on).

- id: set_volume
  label: Set Volume Number
  kind: action
  command: "#SVN {level}"
  params:
    - name: level
      type: integer
      description: Meridian volume number, scale 1-99
  notes: Direct volume set (if not in standby); informs all devices via !VMU.

- id: select_source
  label: Select Logical Source
  kind: action
  command: "#SRC {source}"
  params:
    - name: source
      type: integer
      description: Logical source number, 0-11
  notes: Replies *ACK if source enabled; all devices receive !SRC with Source/Legend/Input/Mute/Volume.

- id: select_source_next
  label: Select Next Source / Wake
  kind: action
  command: "#SRC"
  params: []
  notes: Without a number: brings unit out of standby on last-used (or startup) source, or selects next enabled logical source. UI sees a series of !TMP messages before the final !SRC while scrolling.

- id: display_blank
  label: Display Blank
  kind: action
  command: "#DIS Blank"
  params: []
  notes: Protocol version 3. System-wide display blank; replies *ACK, all devices receive !DIS Blank:"Blank".

- id: display_unblank
  label: Display Unblank
  kind: action
  command: "#DIS Unblank"
  params: []
  notes: Protocol version 3. Replies *ACK, all devices receive !DIS Blank:"Unblank".

- id: reboot
  label: Reboot
  kind: action
  command: "#RBT"
  params: []
  notes: Protocol version 2. Triggers shutdown and reboot; closes all TCP connections and allows time for other processes to shut down before automatic reboot.

- id: get_product_id
  label: Get Product Identification
  kind: query
  command: "?PID"
  params: []
  notes: Replies *PID Product, SerialNumber, VersionNumber, ZoneName, ProtocolVersion. ID41 additionally reports HostProduct/HostSerialNumber/HostVersionNumber.

- id: get_menu_values
  label: Get All Menu Values
  kind: query
  command: "?MGV"
  params: []
  notes: Replies *MGV with all menus as Menu/Value/Show triplets.

- id: get_menu_raw
  label: Get Menu Raw Value
  kind: query
  command: "?MGR {menu}"
  params:
    - name: menu
      type: string
      description: Menu name, e.g. Treble
  notes: Protocol version 2. Replies *MGR Menu, Raw, Show.

- id: get_menu_both
  label: Get Menu Both Values
  kind: query
  command: "?MGB {menu}"
  params:
    - name: menu
      type: string
      description: Menu name, e.g. Treble
  notes: Protocol version 2. Replies *MGB Menu, Value, Raw, Show.

- id: get_menu_focus
  label: Get Menu Focus
  kind: query
  command: "?MGF"
  params: []
  notes: Replies *MGF Menu, Value for the currently focused menu.

- id: get_product_status
  label: Get Product Status
  kind: query
  command: "?PGS"
  params: []
  notes: Replies *PGS Status (Standby/On), Source, Legend, Input, Mute, Volume.

- id: get_audio_status
  label: Get Audio Status
  kind: query
  command: "?AGS"
  params: []
  notes: Replies *AGS Format, SampleRate, Error, Audio.

- id: get_source_legends
  label: Get Source Legends
  kind: query
  command: "?GSL"
  params: []
  notes: Replies *GSL with Source/Legend/Enabled for logical sources 0-11.

- id: get_display_mode
  label: Get Display Mode
  kind: query
  command: "?DIS"
  params: []
  notes: Protocol version 3. Replies *DIS Blank:"Blank" or Blank:"Unblank".
```

## Feedbacks
```yaml
# All replies are LF-terminated strings. Positive command acknowledgement:
- id: ack
  type: string
  values: ["*ACK"]
- id: nak
  type: string
  values: ["*NAK <reason>"]
- id: err
  type: string
  values: ["*ERR <reason>"]
- id: pong
  type: string
  values: ["*PNG"]
- id: product_id
  type: string
  values: ["*PID Product:<name> SerialNumber:<serial> VersionNumber:<ver> ZoneName:<zone> ProtocolVersion:<ver>"]
- id: menu_values
  type: string
  values: ["*MGV Menu:<name> Value:<value> Show:<Yes|No> ..."]
- id: menu_raw
  type: string
  values: ["*MGR Menu:<name> Raw:<int> Show:<Yes|No>"]
- id: menu_both
  type: string
  values: ["*MGB Menu:<name> Value:<value> Raw:<int> Show:<Yes|No>"]
- id: menu_focus
  type: string
  values: ["*MGF Menu:<name> Value:<value>"]
- id: product_status
  type: string
  values: ["*PGS Status:<Standby|On> Source:<0-11> Legend:<text> Input:<text> Mute:<Mute|Demute> Volume:<1-99>"]
- id: audio_status
  type: string
  values: ["*AGS Format:<text> SampleRate:<text> Error:<text> Audio:<Yes|No>"]
- id: source_legends
  type: string
  values: ["*GSL Source:<0-11> Legend:<text> Enabled:<Yes|No> ..."]
- id: display_mode
  type: string
  values: ["*DIS Blank:<Blank|Unblank>"]
```

## Variables
```yaml
# All settable parameters (volume, menu values, source, display mode) are driven by
# discrete actions (#SVN, #MSV, #MVP/#MVM, #SRC, #DIS) - no non-action variables in source.
```

## Events
```yaml
# Unsolicited '!' messages, sent to ALL connected clients (up to 5 simultaneous connections).
- id: product_id_on_connect
  message: "!PID"
  payload: Product, SerialNumber, VersionNumber, ZoneName, ProtocolVersion
  description: Sent automatically when a new TCP connection is made.

- id: source_changed
  message: "!SRC"
  payload: Source (0-11), Legend, Input, Mute, Volume
  description: New source selected.

- id: standby
  message: "!OFF"
  payload: none
  description: Unit entered standby.

- id: volume_mute_changed
  message: "!VMU"
  payload: Mute (Mute/Demute), Volume (1-99)
  description: New volume or mute state.

- id: menu_focus_changed
  message: "!MFC"
  payload: Menu, Value (plus Raw if #MRR on)
  description: Menu focus changed via left/right navigation.

- id: menu_value_changed
  message: "!MVC"
  payload: Menu, Value (plus Raw if #MRR on)
  description: Menu value changed via up/down or #MVP/#MVM/#MSV.

- id: menu_system_reset
  message: "!MRE"
  payload: none
  description: Menu system reset/changed (e.g. source selection or config change); re-query with ?MGV if needed.

- id: temporary_display
  message: "!TMP"
  payload: Display (text string), Period (seconds)
  description: Draw a temporary status display, e.g. !TMP Display:"Controller" Period:"3".

- id: audio_status_changed
  message: "!ASC"
  payload: Format, SampleRate, Error, Audio
  description: Audio stream changed, e.g. sample rate change.

- id: source_legends_changed
  message: "!SLC"
  payload: none
  description: Source legends changed (e.g. via webpage setup); re-query with ?GSL.

- id: display_mode_changed
  message: "!DIS"
  payload: Blank (Blank/Unblank)
  description: Protocol version 3. Display blank status changed by any means.

- id: zone_name_changed
  message: "!ZNC"
  payload: ZoneName
  description: Sooloos zone name changed.

- id: au_revoir
  message: "!ARV"
  payload: optional reason string, e.g. "PNG timeout"
  description: Sent shortly before the product closes a connection.
```

## Macros
```yaml
- id: store_menus_two_step
  steps:
    - command: "#MSR SR"
      description: Replies *ACK plus !TMP Display:"Store Menus?" Period:"3"
    - command: "#MSR SR"
      description: Send again within 3 seconds to store settings; replies *ACK plus !TMP Display:"Menus stored" Period:"3"

- id: clear_menus_two_step
  steps:
    - command: "#MSR CL"
      description: Replies *ACK plus !TMP Display:"Clear Menus?" Period:"3"
    - command: "#MSR CL"
      description: Send again within 3 seconds to restore factory menu settings; replies *ACK plus !TMP Display:"Menus cleared" Period:"3"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source.
# Note (operational, not safety): #RBT closes all TCP connections; #MSV volume-affecting
# commands have no effect in standby.
```

## Notes
- Raw TCP stream on port 9014; all messages human-readable ASCII terminated by LF (0x0A); CR ignored if CR/LF used. Up to 5 simultaneous connections.
- Message grammar: commands prefixed `#`, queries `?`, unsolicited `!`; replies prefixed `*`. Data delivered as Name:"String" pairs separated by spaces; names contain no spaces, printable ASCII only.
- Command rate limiting (MSR emulation): commands within 70ms of previous rejected with `*ERR "Command sent too soon"`; 70–114ms silently delayed until 114ms elapsed. Mirrors 114ms MSR key separation.
- Product pings connections after 5 idle minutes (`#PNG` expecting `*PNG`) and closes non-responding connections; disable with `#DEV` (dev only, not stored across reset).
- Protocol versions: absent ProtocolVersion = version 1; `"2"` adds raw menu values (#MSV, ?MGR, ?MGB, #MRR) and #RBT; `"3"` adds display blank commands (#DIS, ?DIS) and ID41 host identification.
- Menu system unavailable unless a source is selected (`*NAK "No source selected"`). Menus with Show:"No" respond `*NAK "Menu not allowed"`; unknown names `*ERR "Unknown menu"`. Some menus wrap (e.g. Phase), some do not.
- Recommended UX: show menu display 3 seconds then revert to source display; left/right only change focus within that window, up/down always change value.
- Volume is the Meridian volume number, scale 1–99; no effect while in standby (and no unsolicited message).
- Text-only interface; testable via terminal programs (PuTTY) with ping disabled (#DEV).
- Document revision history: issue 4 (Dec 2019) covers 218/251/271 (fw 1.1.213) and ID41 (fw 1.2.213), protocol version 3.

<!-- UNRESOLVED: RS232 serial parameters (baud rate stated as configurable, no value given; connector choice 9-pin D-type vs SpeakerLink is product-dependent) -->
<!-- UNRESOLVED: Ellipse-specific firmware version and protocol version support not stated -->
<!-- UNRESOLVED: full MSR command code list not enumerated in source — retrieve at runtime via "#MSR help" -->

## Provenance

```yaml
source_domains:
  - meridian-audio.com
source_urls:
  - https://www.meridian-audio.com/media/8d93d644a722762/meridian-automation-interface-for-ip-control-issue-4.pdf
retrieved_at: 2026-08-16T13:17:06.673Z
last_checked_at: 2026-08-19T09:34:46.279Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:34:46.279Z
matched_actions: 36
action_count: 36
confidence: medium
summary: "All 36 spec actions and queries appear verbatim in the refined source; transport (port 9014, raw TCP, LF termination) is directly documented. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document covers the \"218 and similar\" family (218, 251, 271, ID41); Ellipse is not named explicitly — model applicability assumed from input metadata"
- "RS232 availability and serial configuration for the Ellipse specifically not stated; baud rate configurable per product, no value given"
- "baud rate stated as configurable, no value given in source"
- "no safety warnings or interlock procedures in source."
- "RS232 serial parameters (baud rate stated as configurable, no value given; connector choice 9-pin D-type vs SpeakerLink is product-dependent)"
- "Ellipse-specific firmware version and protocol version support not stated"
- "full MSR command code list not enumerated in source — retrieve at runtime via \"#MSR help\""
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
