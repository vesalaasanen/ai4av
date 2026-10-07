---
spec_id: admin/benq-mh760
schema_version: ai4av-public-spec-v1
revision: 1
title: "BenQ MH760 Control Spec"
manufacturer: BenQ
model_family: MH760
aliases: []
compatible_with:
  manufacturers:
    - BenQ
  models:
    - MH760
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - esupportdownload.benq.com
  - esupportbenq.blob.core.windows.net
  - benq.com
source_urls:
  - "https://esupportdownload.benq.com/esupport/Projector/Control%20Protocols/BS5050/RS232%20Control%20Guide_0_Windows10_Windows7_Windows8.pdf"
  - "https://esupportbenq.blob.core.windows.net/esupport/PROJECTOR/Control%20Protocols/MH760/MH760_RS232%20Control%20Guide_0_Windows10_Windows7_Windows8.pdf"
  - https://esupportdownload.benq.com/esupport/Projector/UserManual/MH760/MH760_UM_EN.pdf
  - https://www.benq.com/en-us/business/support/products/projector/mh760/download.html
  - https://www.benq.com/en-us/support/downloads-faq/products/projector/mh760/manual.html
retrieved_at: 2026-05-14T12:16:55.183Z
last_checked_at: 2026-10-01T07:19:09.100Z
generated_at: 2026-10-01T07:19:09.100Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "response format not fully documented (exact response strings, error codes beyond Illegal format / Unsupported item / Block item)"
  - "command timing, cooldown, or queuing rules not stated"
  - "maximum concurrent connections over TCP not stated"
  - "authentication not documented; whether any login or credentials are required for RS-232 or TCP control is not stated in the source"
  - "source does not document absolute-value set commands for contrast,"
  - "no unsolicited notification protocol documented in source"
  - "no multi-step sequences documented in source"
  - "source notes \"Commands are working if the standby power is 0.5W"
  - "exact response string format for read commands not documented"
  - "lamp hour resolution (hours vs. tenths of hours) not stated"
  - "volume range (0–N) not stated"
  - "warm-up cooldown between power on and next command not stated"
  - "maximum concurrent TCP connections not stated"
verification:
  verdict: verified
  checked_at: 2026-10-01T07:19:09.100Z
  matched_actions: 103
  action_count: 103
  confidence: medium
  summary: "All 103 action units match source literals; all 47 source mnemonics are represented in spec; transport values (port 8000, 8N1, baud rates) verbatim in source. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# BenQ MH760 Control Spec

## Summary

BenQ MH760 digital projector controllable via RS-232 serial and TCP/IP (LAN). Command format: `<CR>*<command>=<value>#<CR>` for writes, `<CR>*<command>?#<CR>` for reads. Responses echo the command with the current value.

<!-- UNRESOLVED: response format not fully documented (exact response strings, error codes beyond Illegal format / Unsupported item / Block item) -->
<!-- UNRESOLVED: command timing, cooldown, or queuing rules not stated -->
<!-- UNRESOLVED: maximum concurrent connections over TCP not stated -->
<!-- UNRESOLVED: authentication not documented; whether any login or credentials are required for RS-232 or TCP control is not stated in the source -->

## Transport

```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 8000
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: UNRESOLVED  # source does not document any authentication procedure; whether auth is none, required, or unspecified is unknown
```

## Traits

```yaml
traits:
  - powerable    # inferred from power on/off commands
  - routable     # inferred from source selection commands
  - queryable    # inferred from read/status query commands
  - levelable    # inferred from volume, contrast, brightness, color, sharpness adjustment
```

## Actions

```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: "<CR>*pow=on#<CR>"
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: "<CR>*pow=off#<CR>"
    params: []

  - id: select_source
    label: Select Source
    kind: action
    command: "<CR>*sour={source}#<CR>"
    params:
      - name: source
        type: enum
        values:
          - RGB
          - RGB2
          - hdmi
          - hdmi2
          - vid
          - svid
        description: "Input source (RGB=Computer/YPbPr, RGB2=Computer2/YPbPr2, hdmi=HDMI/MHL, hdmi2=HDMI2/MHL2, vid=Composite, svid=S-Video)"

  - id: mute_on
    label: Mute On
    kind: action
    command: "<CR>*mute=on#<CR>"
    params: []

  - id: mute_off
    label: Mute Off
    kind: action
    command: "<CR>*mute=off#<CR>"
    params: []

  - id: volume_up
    label: Volume Up
    kind: action
    command: "<CR>*vol=+#<CR>"
    params: []

  - id: volume_down
    label: Volume Down
    kind: action
    command: "<CR>*vol=-#<CR>"
    params: []

  - id: audio_source_select
    label: Audio Source Select
    kind: action
    command: "<CR>*audiosour={source}#<CR>"
    params:
      - name: source
        type: enum
        values:
          - "off"
          - RGB
          - RGB2
          - vid
          - hdmi
          - hdmi2
        description: "Audio pass-through source (off=disable pass-through)"

  - id: picture_mode
    label: Picture Mode
    kind: action
    command: "<CR>*appmod={mode}#<CR>"
    params:
      - name: mode
        type: enum
        values:
          - preset
          - srgb
          - bright
          - cine
          - user1
          - user2
          - threed
        description: "Picture mode preset"

  - id: contrast_up
    label: Contrast Up
    kind: action
    command: "<CR>*con=+#<CR>"
    params: []

  - id: contrast_down
    label: Contrast Down
    kind: action
    command: "<CR>*con=-#<CR>"
    params: []

  - id: brightness_up
    label: Brightness Up
    kind: action
    command: "<CR>*bri=+#<CR>"
    params: []

  - id: brightness_down
    label: Brightness Down
    kind: action
    command: "<CR>*bri=-#<CR>"
    params: []

  - id: color_up
    label: Color Up
    kind: action
    command: "<CR>*color=+#<CR>"
    params: []

  - id: color_down
    label: Color Down
    kind: action
    command: "<CR>*color=-#<CR>"
    params: []

  - id: sharpness_up
    label: Sharpness Up
    kind: action
    command: "<CR>*sharp=+#<CR>"
    params: []

  - id: sharpness_down
    label: Sharpness Down
    kind: action
    command: "<CR>*sharp=-#<CR>"
    params: []

  - id: color_temperature
    label: Color Temperature
    kind: action
    command: "<CR>*ct={temp}#<CR>"
    params:
      - name: temp
        type: enum
        values:
          - warm
          - normal
          - cool
          - native
        description: "Color temperature preset"

  - id: aspect_ratio
    label: Aspect Ratio
    kind: action
    command: "<CR>*asp={ratio}#<CR>"
    params:
      - name: ratio
        type: enum
        values:
          - "4:3"
          - "16:9"
          - "16:10"
          - AUTO
          - REAL
        description: "Aspect ratio setting"

  - id: digital_zoom_in
    label: Digital Zoom In
    kind: action
    command: "<CR>*zoomI#<CR>"
    params: []

  - id: digital_zoom_out
    label: Digital Zoom Out
    kind: action
    command: "<CR>*zoomO#<CR>"
    params: []

  - id: auto_sync
    label: Auto Sync
    kind: action
    command: "<CR>*auto#<CR>"
    params: []

  - id: brilliant_color_on
    label: Brilliant Color On
    kind: action
    command: "<CR>*BC=on#<CR>"
    params: []

  - id: brilliant_color_off
    label: Brilliant Color Off
    kind: action
    command: "<CR>*BC=off#<CR>"
    params: []

  - id: projector_position
    label: Projector Position
    kind: action
    command: "<CR>*pp={position}#<CR>"
    params:
      - name: position
        type: enum
        values:
          - FT
          - RE
          - RC
          - FC
        description: "FT=Front Table, RE=Rear Table, RC=Rear Ceiling, FC=Front Ceiling"

  - id: quick_auto_search_on
    label: Quick Auto Search On
    kind: action
    command: "<CR>*QAS=on#<CR>"
    params: []

  - id: quick_auto_search_off
    label: Quick Auto Search Off
    kind: action
    command: "<CR>*QAS=off#<CR>"
    params: []

  - id: direct_power_on
    label: Direct Power On Enable
    kind: action
    command: "<CR>*directpower=on#<CR>"
    params: []

  - id: direct_power_off
    label: Direct Power On Disable
    kind: action
    command: "<CR>*directpower=off#<CR>"
    params: []

  - id: signal_power_on
    label: Signal Power On Enable
    kind: action
    command: "<CR>*autopower=on#<CR>"
    params: []

  - id: signal_power_off
    label: Signal Power On Disable
    kind: action
    command: "<CR>*autopower=off#<CR>"
    params: []

  - id: standby_monitor_on
    label: Standby Monitor Out On
    kind: action
    command: "<CR>*standbymnt=on#<CR>"
    params: []

  - id: standby_monitor_off
    label: Standby Monitor Out Off
    kind: action
    command: "<CR>*standbymnt=off#<CR>"
    params: []

  - id: set_baud_rate
    label: Set Baud Rate
    kind: action
    command: "<CR>*baud={rate}#<CR>"
    params:
      - name: rate
        type: enum
        values:
          - "2400"
          - "4800"
          - "9600"
          - "14400"
          - "19200"
          - "38400"
          - "57600"
          - "115200"
        description: "Serial baud rate"

  - id: lamp_mode
    label: Lamp Mode
    kind: action
    command: "<CR>*lampm={mode}#<CR>"
    params:
      - name: mode
        type: enum
        values:
          - lnor
          - eco
          - seco
        description: "lnor=Normal, eco=Eco, seco=Smart Eco (ImageCare)"

  - id: blank_on
    label: Blank On
    kind: action
    command: "<CR>*blank=on#<CR>"
    params: []

  - id: blank_off
    label: Blank Off
    kind: action
    command: "<CR>*blank=off#<CR>"
    params: []

  - id: freeze_on
    label: Freeze On
    kind: action
    command: "<CR>*freeze=on#<CR>"
    params: []

  - id: freeze_off
    label: Freeze Off
    kind: action
    command: "<CR>*freeze=off#<CR>"
    params: []

  - id: menu_on
    label: Menu On
    kind: action
    command: "<CR>*menu=on#<CR>"
    params: []

  - id: menu_off
    label: Menu Off
    kind: action
    command: "<CR>*menu=off#<CR>"
    params: []

  - id: nav_up
    label: Navigate Up
    kind: action
    command: "<CR>*up#<CR>"
    params: []

  - id: nav_down
    label: Navigate Down
    kind: action
    command: "<CR>*down#<CR>"
    params: []

  - id: nav_right
    label: Navigate Right
    kind: action
    command: "<CR>*right#<CR>"
    params: []

  - id: nav_left
    label: Navigate Left
    kind: action
    command: "<CR>*left#<CR>"
    params: []

  - id: nav_enter
    label: Navigate Enter
    kind: action
    command: "<CR>*enter#<CR>"
    params: []

  - id: set_3d_mode
    label: 3D Mode
    kind: action
    command: "<CR>*3d={mode}#<CR>"
    params:
      - name: mode
        type: enum
        values:
          - "off"
          - auto
          - tb
          - fs
          - fp
          - sbs
          - da
          - iv
        description: "3D sync mode (tb=Top/Bottom, fs=Frame Sequential, fp=Frame Packing, sbs=Side by Side, da=Inverter Disable, iv=Inverter)"

  - id: instant_on_enable
    label: Instant On Enable
    kind: action
    command: "<CR>*ins=on#<CR>"
    params: []

  - id: instant_on_disable
    label: Instant On Disable
    kind: action
    command: "<CR>*ins=off#<CR>"
    params: []

  - id: high_altitude_on
    label: High Altitude Mode On
    kind: action
    command: "<CR>*Highaltitude=on#<CR>"
    params: []

  - id: high_altitude_off
    label: High Altitude Mode Off
    kind: action
    command: "<CR>*Highaltitude=off#<CR>"
    params: []

  # --- Commands below are documented in the source command table but marked
  #     Support=No for the MH760 (device echoes "Unsupported item"). Included
  #     for source coverage; they will not execute on this model. ---

  - id: mic_volume_up
    label: Mic Volume Up
    kind: action
    command: "<CR>*micvol=+#<CR>"
    params: []
    note: "Source marks Support=No for MH760"

  - id: mic_volume_down
    label: Mic Volume Down
    kind: action
    command: "<CR>*micvol=-#<CR>"
    params: []
    note: "Source marks Support=No for MH760"

  - id: standby_network_on
    label: Standby Network On
    kind: action
    command: "<CR>*standbynet=on#<CR>"
    params: []
    note: "Source marks Support=No for MH760"

  - id: standby_network_off
    label: Standby Network Off
    kind: action
    command: "<CR>*standbynet=off#<CR>"
    params: []
    note: "Source marks Support=No for MH760"

  - id: standby_microphone_on
    label: Standby Microphone On
    kind: action
    command: "<CR>*standbymic=on#<CR>"
    params: []
    note: "Source marks Support=No for MH760"

  - id: standby_microphone_off
    label: Standby Microphone Off
    kind: action
    command: "<CR>*standbymic=off#<CR>"
    params: []
    note: "Source marks Support=No for MH760"

  - id: remote_receiver
    label: Remote Receiver
    kind: action
    command: "<CR>*rr={receiver}#<CR>"
    params:
      - name: receiver
        type: enum
        values:
          - fr
          - f
          - r
          - t
          - tf
          - tr
        description: "fr=front+rear, f=front, r=rear, t=top, tf=top+front, tr=top+rear"
    note: "Source marks Support=No for MH760"

  - id: lamp_saver_on
    label: LampSaver Mode On
    kind: action
    command: "<CR>*lpsaver=on#<CR>"
    params: []
    note: "Source marks Support=No for MH760"

  - id: lamp_saver_off
    label: LampSaver Mode Off
    kind: action
    command: "<CR>*lpsaver=off#<CR>"
    params: []
    note: "Source marks Support=No for MH760"

  - id: projection_login_code_on
    label: Projection LogIn Code On
    kind: action
    command: "<CR>*prjlogincode=on#<CR>"
    params: []
    note: "Source marks Support=No for MH760"

  - id: projection_login_code_off
    label: Projection LogIn Code Off
    kind: action
    command: "<CR>*prjlogincode=off#<CR>"
    params: []
    note: "Source marks Support=No for MH760"

  - id: broadcasting_on
    label: Broadcasting On
    kind: action
    command: "<CR>*broadcasting=on#<CR>"
    params: []
    note: "Source marks Support=No for MH760"

  - id: broadcasting_off
    label: Broadcasting Off
    kind: action
    command: "<CR>*broadcasting=off#<CR>"
    params: []
    note: "Source marks Support=No for MH760"

  - id: amx_device_discovery_on
    label: AMX Device Discovery On
    kind: action
    command: "<CR>*amxdd=on#<CR>"
    params: []
    note: "Source marks Support=No for MH760"

  - id: amx_device_discovery_off
    label: AMX Device Discovery Off
    kind: action
    command: "<CR>*amxdd=off#<CR>"
    params: []
    note: "Source marks Support=No for MH760"
```

## Feedbacks

```yaml
feedbacks:
  - id: power_state
    label: Power Status
    type: enum
    query_command: "<CR>*pow=?#<CR>"
    values:
      - "on"
      - "off"

  - id: current_source
    label: Current Source
    type: string
    query_command: "<CR>*sour=?#<CR>"

  - id: mute_status
    label: Mute Status
    type: enum
    query_command: "<CR>*mute=?#<CR>"
    values:
      - "on"
      - "off"

  - id: volume_status
    label: Volume Status
    type: integer
    query_command: "<CR>*vol=?#<CR>"

  - id: audio_source_status
    label: Audio Source Status
    type: string
    query_command: "<CR>*audiosour=?#<CR>"

  - id: picture_mode_status
    label: Picture Mode Status
    type: string
    query_command: "<CR>*appmod=?#<CR>"

  - id: contrast_value
    label: Contrast Value
    type: integer
    query_command: "<CR>*con=?#<CR>"

  - id: brightness_value
    label: Brightness Value
    type: integer
    query_command: "<CR>*bri=?#<CR>"

  - id: color_value
    label: Color Value
    type: integer
    query_command: "<CR>*color=?#<CR>"

  - id: sharpness_value
    label: Sharpness Value
    type: integer
    query_command: "<CR>*sharp=?#<CR>"

  - id: color_temperature_status
    label: Color Temperature Status
    type: string
    query_command: "<CR>*ct=?#<CR>"

  - id: aspect_status
    label: Aspect Ratio Status
    type: string
    query_command: "<CR>*asp=?#<CR>"

  - id: brilliant_color_status
    label: Brilliant Color Status
    type: enum
    query_command: "<CR>*BC=?#<CR>"
    values:
      - "on"
      - "off"

  - id: projector_position_status
    label: Projector Position Status
    type: string
    query_command: "<CR>*pp=?#<CR>"

  - id: quick_auto_search_status
    label: Quick Auto Search Status
    type: enum
    query_command: "<CR>*QAS=?#<CR>"
    values:
      - "on"
      - "off"

  - id: direct_power_status
    label: Direct Power On Status
    type: enum
    query_command: "<CR>*directpower=?#<CR>"
    values:
      - "on"
      - "off"

  - id: signal_power_status
    label: Signal Power On Status
    type: enum
    query_command: "<CR>*autopower=?#<CR>"
    values:
      - "on"
      - "off"

  - id: standby_monitor_status
    label: Standby Monitor Out Status
    type: enum
    query_command: "<CR>*standbymnt=?#<CR>"
    values:
      - "on"
      - "off"

  - id: baud_rate_status
    label: Current Baud Rate
    type: integer
    query_command: "<CR>*baud=?#<CR>"

  - id: lamp_hours
    label: Lamp Hours
    type: integer
    query_command: "<CR>*ltim=?#<CR>"

  - id: lamp_mode_status
    label: Lamp Mode Status
    type: string
    query_command: "<CR>*lampm=?#<CR>"

  - id: model_name
    label: Model Name
    type: string
    query_command: "<CR>*modelname=?#<CR>"

  - id: blank_status
    label: Blank Status
    type: enum
    query_command: "<CR>*blank=?#<CR>"
    values:
      - "on"
      - "off"

  - id: freeze_status
    label: Freeze Status
    type: enum
    query_command: "<CR>*freeze=?#<CR>"
    values:
      - "on"
      - "off"

  - id: sync_3d_status
    label: 3D Sync Status
    type: string
    query_command: "<CR>*3d=?#<CR>"

  - id: instant_on_status
    label: Instant On Status
    type: enum
    query_command: "<CR>*ins=?#<CR>"
    values:
      - "on"
      - "off"

  - id: high_altitude_status
    label: High Altitude Mode Status
    type: enum
    query_command: "<CR>*Highaltitude=?#<CR>"
    values:
      - "on"
      - "off"

  # --- Query commands below are documented in the source command table but
  #     marked Support=No for the MH760. ---

  - id: mic_volume_status
    label: Mic Volume Status
    type: integer
    query_command: "<CR>*micvol=?#<CR>"
    note: "Source marks Support=No for MH760"

  - id: standby_network_status
    label: Standby Network Status
    type: enum
    query_command: "<CR>*standbynet=?#<CR>"
    values:
      - "on"
      - "off"
    note: "Source marks Support=No for MH760"

  - id: standby_microphone_status
    label: Standby Microphone Status
    type: enum
    query_command: "<CR>*standbymic=?#<CR>"
    values:
      - "on"
      - "off"
    note: "Source marks Support=No for MH760"

  - id: lamp2_hours
    label: Lamp2 Hour
    type: integer
    query_command: "<CR>*ltim2=?#<CR>"
    note: "Source marks Support=No for MH760"

  - id: remote_receiver_status
    label: Remote Receiver Status
    type: string
    query_command: "<CR>*rr=?#<CR>"
    note: "Source marks Support=No for MH760"

  - id: lamp_saver_status
    label: Lamp Saver Mode Status
    type: enum
    query_command: "<CR>*lpsaver=?#<CR>"
    values:
      - "on"
      - "off"
    note: "Source marks Support=No for MH760"

  - id: projection_login_code_status
    label: Projection LogIn Code Status
    type: enum
    query_command: "<CR>*prjlogincode=?#<CR>"
    values:
      - "on"
      - "off"
    note: "Source marks Support=No for MH760"

  - id: broadcasting_status
    label: Broadcasting Status
    type: enum
    query_command: "<CR>*broadcasting=?<CR>"
    values:
      - "on"
      - "off"
    note: "Verbatim per source (line omits the '#' terminator before <CR>). Source marks Support=No for MH760"

  - id: amx_device_discovery_status
    label: AMX Device Discovery Status
    type: enum
    query_command: "<CR>*amxdd=?#<CR>"
    values:
      - "on"
      - "off"
    note: "Source marks Support=No for MH760"

  - id: mac_address
    label: Mac Address
    type: string
    query_command: "<CR>*macaddr=?#<CR>"
    note: "Source marks Support=No for MH760"
```

## Variables

```yaml
# UNRESOLVED: source does not document absolute-value set commands for contrast,
# brightness, color, sharpness, or volume - only incremental (+/-) adjustments.
# Volume, contrast, brightness, color, sharpness are levelable via incremental
# commands only; no absolute value parameter documented.
```

## Events

```yaml
# UNRESOLVED: no unsolicited notification protocol documented in source
```

## Macros

```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety

```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source notes "Commands are working if the standby power is 0.5W
# or a supported baud rate of the projector is set" but no interlock or
# power-on sequencing requirements are documented.
```

## Notes

- Commands are case-insensitive (uppercase, lowercase, mixed accepted).
- Error responses: `Illegal format` (bad syntax), `Unsupported item` (valid syntax but not for this model), `Block item` (valid but cannot execute under current conditions).
- RS-232 via LAN uses identical command set over TCP port 8000; commands must still be wrapped with `<CR>...#<CR>`.
- Source also documents an RS-232 via HDBaseT path (same serial framing: 9600–115200 baud, 8N1, no flow control). HDBaseT carries the same RS-232 command set; no separate protocol enum is emitted because the wire protocol remains serial.
- Default baud rate is configurable via OSD menu; serial config must match projector's current setting.
- Changing baud rate via `*baud=` command takes effect immediately — subsequent serial communication must use the new rate.
- The BenQ command table is a generic multi-model table with a per-row `Support` column. All MH760-supported (Yes) commands are represented above. Commands marked `note: "Source marks Support=No for MH760"` are documented in the source table but the MH760 echoes `Unsupported item`; they are included for full source coverage of the documented command set.
- Authentication is not documented in the source; whether any auth is required for RS-232, TCP, or HDBaseT control is unknown.

<!-- UNRESOLVED: exact response string format for read commands not documented -->
<!-- UNRESOLVED: lamp hour resolution (hours vs. tenths of hours) not stated -->
<!-- UNRESOLVED: volume range (0–N) not stated -->
<!-- UNRESOLVED: warm-up cooldown between power on and next command not stated -->
<!-- UNRESOLVED: maximum concurrent TCP connections not stated -->

## Provenance

```yaml
source_domains:
  - esupportdownload.benq.com
  - esupportbenq.blob.core.windows.net
  - benq.com
source_urls:
  - "https://esupportdownload.benq.com/esupport/Projector/Control%20Protocols/BS5050/RS232%20Control%20Guide_0_Windows10_Windows7_Windows8.pdf"
  - "https://esupportbenq.blob.core.windows.net/esupport/PROJECTOR/Control%20Protocols/MH760/MH760_RS232%20Control%20Guide_0_Windows10_Windows7_Windows8.pdf"
  - https://esupportdownload.benq.com/esupport/Projector/UserManual/MH760/MH760_UM_EN.pdf
  - https://www.benq.com/en-us/business/support/products/projector/mh760/download.html
  - https://www.benq.com/en-us/support/downloads-faq/products/projector/mh760/manual.html
retrieved_at: 2026-05-14T12:16:55.183Z
last_checked_at: 2026-10-01T07:19:09.100Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T07:19:09.100Z
matched_actions: 103
action_count: 103
confidence: medium
summary: "All 103 action units match source literals; all 47 source mnemonics are represented in spec; transport values (port 8000, 8N1, baud rates) verbatim in source. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "response format not fully documented (exact response strings, error codes beyond Illegal format / Unsupported item / Block item)"
- "command timing, cooldown, or queuing rules not stated"
- "maximum concurrent connections over TCP not stated"
- "authentication not documented; whether any login or credentials are required for RS-232 or TCP control is not stated in the source"
- "source does not document absolute-value set commands for contrast,"
- "no unsolicited notification protocol documented in source"
- "no multi-step sequences documented in source"
- "source notes \"Commands are working if the standby power is 0.5W"
- "exact response string format for read commands not documented"
- "lamp hour resolution (hours vs. tenths of hours) not stated"
- "volume range (0–N) not stated"
- "warm-up cooldown between power on and next command not stated"
- "maximum concurrent TCP connections not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
