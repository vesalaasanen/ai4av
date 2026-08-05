---
spec_id: admin/netron-en
schema_version: ai4av-public-spec-v1
revision: 2
title: "Netron EN EtherDMX Gateway Control Spec"
manufacturer: Netron
model_family: EN
aliases: []
compatible_with:
  manufacturers:
    - Netron
  models:
    - EN
    - EN-12
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - ltb.no
  - obsidiancontrol.com
  - forum.obsidiancontrol.com
source_urls:
  - "https://ltb.no/media/multicase/documents/netron/netron%20en4%20ep4%20en12%20en12-45%20-%20user%20guide%202022-05-25.pdf"
  - https://www.obsidiancontrol.com/products/en4
  - https://www.obsidiancontrol.com/products/en12
  - https://forum.obsidiancontrol.com
retrieved_at: 2026-07-17T16:13:31.305Z
last_checked_at: 2026-07-21T23:41:22.994Z
generated_at: 2026-07-21T23:41:22.994Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Art-Net (6454) and sACN (5568) UDP port numbers not stated in source"
  - "web interface HTTP port not stated in source"
  - "no ASCII/serial command reference — control via web UI, device menus, and DMX value triggers only"
  - "web interface TCP port not stated in source"
  - "powerable - no power on/off commands documented; device is a gateway"
  - "routable - DMX port routing configured via menus/web UI, not discrete commands"
  - "queryable - device state observable via web UI and onboard display, no query command protocol documented"
  - "no unsolicited notification protocol documented"
  - "no other safety-critical commands or interlock procedures stated in source"
  - "Art-Net (6454) and sACN (5568) UDP ports not stated in source"
  - "firmware version compatibility not stated in source"
  - "protocol versions (Art-Net 3/4, sACN E1.31) not stated in source"
verification:
  verdict: verified
  checked_at: 2026-07-21T23:41:22.994Z
  matched_actions: 18
  action_count: 18
  confidence: medium
  summary: "All 18 spec actions matched to source commands; no extraneous commands; transport parameters verified. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-30
---

# Netron EN EtherDMX Gateway Control Spec

## Summary
Netron EN and EN-12 are EtherDMX gateways that bridge Ethernet-based lighting control protocols (Art-Net and sACN) to DMX512 output. Up to 12 DMX ports on the EN12 model with RDM, merging, cloning, and preset recall capabilities. The device is configured via a web browser interface at its IP address and onboard display menus; remote triggers are issued as DMX/Art-Net/sACN values at a configured Universe/Address.

<!-- UNRESOLVED: Art-Net (6454) and sACN (5568) UDP port numbers not stated in source -->
<!-- UNRESOLVED: web interface HTTP port not stated in source -->
<!-- UNRESOLVED: no ASCII/serial command reference — control via web UI, device menus, and DMX value triggers only -->

## Transport
```yaml
protocols:
  - http  # web browser remote configuration interface (Tier 1: web browser mentioned)
  - udp   # inferred: Art-Net and sACN remote triggers documented (Tier 2)
addressing:
  base_url: http://{device_ip}  # web browser access; device IP shown in display, set via IP Address menu
  port: null  # UNRESOLVED: web interface TCP port not stated in source
auth:
  type: none  # inferred: no login/password procedure documented for web interface access
```

## Traits
```yaml
# UNRESOLVED: powerable - no power on/off commands documented; device is a gateway
# UNRESOLVED: routable - DMX port routing configured via menus/web UI, not discrete commands
# UNRESOLVED: queryable - device state observable via web UI and onboard display, no query command protocol documented
```

## Actions
```yaml
# Device operates as a gateway. No ASCII/serial command strings documented.
# Control payloads are: (a) DMX/Art-Net/sACN values at configured Universe/Address for remote triggers,
#                       (b) HTTP requests to specific web UI pages,
#                       (c) menu operations performed via display/web UI.

# --- Remote Input triggers (source §DMX Map for Remote Trigger) ---
# Each of 10 remote input slots is configurable. Trigger fires when DMX value at the slot's
# configured Universe/Address falls within the slot's value range.
- id: trigger_remote_input
  label: Trigger Remote Input
  kind: action
  command: "DMX value {value} at Universe {universe} Address {address}"  # sent over DMX In / Art-Net / sACN per slot Source config
  params:
    - name: value
      type: integer
      description: "DMX value 0-255. Range mapping per source: 0-10 Idle, 11-20 Input 1, 21-30 Input 2, 31-40 Input 3, 41-50 Input 4, 51-60 Input 5, 61-70 Input 6, 71-80 Input 7, 81-90 Input 8, 91-100 Input 9, 101-110 Input 10, 111-255 Idle"
    - name: universe
      type: integer
      description: "Remote trigger Universe (configured per slot)"
    - name: address
      type: integer
      description: "Remote trigger DMX Address (configured per slot)"

# Each remote slot can be assigned one of the following actions when triggered:
- id: remote_recall_cue
  label: Recall Cue (Remote Trigger Assignment)
  kind: action
  command: "configure slot assignment = Cue; fire trigger_remote_input"
  params:
    - name: cue
      type: integer
      description: "Cue number 1-99"

- id: remote_recall_netron_preset
  label: Recall Netron Preset (Remote Trigger Assignment)
  kind: action
  command: "configure slot assignment = Netron Preset; fire trigger_remote_input"
  params:
    - name: preset
      type: string
      description: "Netron preset label a, b, c, …"

- id: remote_recall_user_preset
  label: Recall User Preset (Remote Trigger Assignment)
  kind: action
  command: "configure slot assignment = User Preset; fire trigger_remote_input"
  params:
    - name: preset
      type: integer
      description: "User preset 1-10"

- id: remote_disable_dmx
  label: Disable DMX Output (Remote Trigger Assignment)
  kind: action
  command: "configure slot assignment = Disable DMX; fire trigger_remote_input"
  params: []
  notes: "Stops all DMX output for as long as contact/trigger is active"

- id: remote_send_value
  label: Send Static DMX Value (Remote Trigger Assignment)
  kind: action
  command: "configure slot assignment = Send Value; fire trigger_remote_input"
  params:
    - name: value
      type: integer
      description: "DMX value 0-255 sent on all ports while contact/trigger is active"

# --- Web UI HTTP actions (source §Web Remote Menu: Inputs - Owner Preset) ---
- id: lock_owner_preset
  label: Lock Owner Preset
  kind: action
  command: "GET http://{device_ip}/Preset_Owner.htm"  # hidden web UI page; select preset, activate lock, click Update
  params:
    - name: preset
      type: integer
      description: "User preset 1-10 to lock as owner"

# --- System menu operations (source §Menu: System) ---
- id: lock_device
  label: Lock Device
  kind: action
  command: "System > Lock Device > Manual Lock; PIN required (default 011)"
  params: []

- id: unlock_device
  label: Unlock Device
  kind: action
  command: "System > Lock Device > Unlock; PIN required (default 011)"
  params: []

- id: save_backup_config
  label: Save Backup Configuration
  kind: action
  command: "System > Backup Config > Save Config"
  params: []

- id: load_backup_config
  label: Load Backup Configuration
  kind: action
  command: "System > Backup Config > Load Config"
  params: []

- id: enable_rdm_all
  label: Enable RDM Processing (All Ports)
  kind: action
  command: "System > RDM Processing > All Enable"
  params: []

- id: disable_rdm_all
  label: Disable RDM Processing (All Ports)
  kind: action
  command: "System > RDM Processing > All Disable"
  params: []

- id: factory_reset_full
  label: Factory Reset (Full)
  kind: action
  command: "System > Factory Reset; PIN 011; Confirm Yes/No"
  params: []
  notes: "Resets to factory default. Reloads NETRON Preset 1. All cues deleted, all settings to default."

- id: factory_reset_user_preset
  label: Factory Reset (User Preset 1)
  kind: action
  command: "System > Factory Reset; PIN 007; Confirm Yes/No"
  params: []
  notes: "Resets device to User Preset 1."

# --- Firmware update (source §Firmware Updates) ---
- id: firmware_update_display_nfw
  label: Firmware Update - Display NFW
  kind: action
  command: "Web UI > System > Maintenance; upload Display NFW file"
  params: []
  notes: "Do not power cycle during update. One of two files required for full upgrade."

- id: firmware_update_web_img
  label: Firmware Update - Web IMG
  kind: action
  command: "Web UI > System > Maintenance; upload Web IMG file"
  params: []
  notes: "Do not power cycle during update. One of two files required for full upgrade."

- id: recovery_firmware_update
  label: Recovery Firmware Update
  kind: action
  command: "GET http://{device_ip}/update.html"  # used when System menu is corrupt; substitute actual device IP
  params: []
```

## Feedbacks
```yaml
# No discrete response strings documented. Device sends no unsolicited ASCII commands.
# DMX port status observable via LED indicators per source §DMX Port Status Indicator LEDs:
- id: dmx_port_status_led
  type: enum
  values: [red_solid_error, green_solid_dmx_in, green_blink_dmx_lost, blue_solid_dmx_out_stable, blue_blink_dmx_lost, white_flash_rdm_packet]
  description: "LED color + behavior indicates DMX port state"
```

## Variables
```yaml
# DMX Port Settings (per port 1-12 on EN12; per port 1-4 on EN4/EP4) - source §Menu: DMX Ports
- id: port_mode
  type: enum
  values: [disable, input, output, send_value]
  description: "Per-port DMX mode"

- id: port_send_value
  type: integer
  range: [0, 255]
  description: "Static DMX value sent when port mode = send_value"

- id: port_universe
  type: integer
  range: [1, 32767]
  description: "Per-port EtherDMX Universe selection"

- id: port_protocol
  type: enum
  values: [artnet, sacn, none]
  description: "Per-port EtherDMX protocol"

- id: port_framerate
  type: enum
  values: [10, 15, 20, 25, 30, 35, 40]
  description: "Per-port DMX frame rate (fps)"

- id: port_rdm
  type: enum
  values: [disable, enable]
  description: "Per-port RDM traffic enable (default enable)"

- id: port_merge
  type: enum
  values: [off, htp, ltp, toggle, backup]
  description: "Per-port merge mode"

- id: port_clone
  type: enum
  values: [none, port_2, port_3, port_4]
  description: "Replicates identical DMX data from another port"

- id: port_range_from
  type: integer
  range: [1, 512]
  description: "DMX range start address"

- id: port_range_to
  type: integer
  range: [1, 512]
  description: "DMX range end address"

- id: port_offset_addr
  type: integer
  range: [0, 511]
  description: "Offset start address; off=0, otherwise 2-511. Incoming channel X is sent as channel X+Offset; channels cut off if exceed 512."

# Remote Input Settings (per slot 1-10) - source §Menu: Remote Input
- id: remote_cue
  type: integer
  range: [1, 99]
  description: "Cue number recalled when slot is triggered"

- id: remote_cue_mode
  type: enum
  values: [trigger, toggle]
  description: "Trigger: cue activated each time contact fires. Toggle: cue alternates on contact open/close."

- id: remote_netron_preset
  type: string
  description: "Netron preset label (a, b, c, …) recalled when slot is triggered"

- id: remote_user_preset
  type: integer
  range: [1, 10]
  description: "User preset recalled when slot is triggered"

- id: remote_disable_dmx
  type: boolean
  description: "If true, slot assignment stops all DMX output while contact/trigger active"

- id: remote_send_value
  type: integer
  range: [0, 255]
  description: "Static DMX value sent on all ports while slot contact/trigger active"

- id: remote_source
  type: enum
  values: [disabled, dmx_port, artNet, sacn]
  description: "Source for the remote trigger"

- id: remote_dmx_port
  type: integer
  description: "DMX input port number used when source = dmx_port (port must be set as Input)"

- id: remote_universe
  type: integer
  description: "Universe for Art-Net/sACN remote trigger"

- id: remote_address
  type: integer
  description: "DMX Address for Art-Net/sACN remote trigger"

# IP Address Settings - source §Menu: IP Address
- id: ip_mode
  type: enum
  values: [dhcp, automatic_2x, automatic_10x, automatic_192x, automatic_172x, custom]
  description: "IP address assignment mode"

- id: ip_address
  type: string
  description: "Device IP address (format x.x.x.x). Unique 2.x.x.x assigned at factory."

- id: ip_subnet
  type: string
  description: "Subnet mask (format x.x.x.x). Default 255.0.0.0 for auto modes."

# System Settings - source §Menu: System
- id: device_name
  type: string
  description: "12-character device label"

- id: device_id
  type: integer
  range: [0, 999]
  description: "Optional device ID"

- id: display_timeout
  type: enum
  values: [disable, 10s, 30s, 1m, 5m, 10m]
  description: "Display sleep timeout"

- id: screen_brightness
  type: integer
  range: [1, 10]
  description: "Internal display brightness"

- id: led_brightness
  type: integer
  range: [0, 10]
  description: "Front LED brightness (0 disables LEDs)"

- id: home_screen
  type: enum
  values: [device_info, cue_browser]
  description: "Default home screen content"

- id: artnet_start
  type: enum
  values: [universe_0, universe_1]
  description: "Art-Net start universe mapping. Universe 0: Universe 1 sent to Art-Net 0-0. Universe 1: Universe 1 sent to Art-Net 0-1."

- id: lock_mode
  type: enum
  values: [disable, timeout, manual]
  description: "Device lock behavior"

- id: lock_pin
  type: string
  description: "Device lock PIN (default 011)"

- id: startup_behavior
  type: enum
  values: [cue, wait_for_data, send_0]
  description: "Startup DMX behavior"

- id: startup_cue
  type: integer
  description: "Cue run at startup when startup_behavior = cue"

- id: signal_loss_behavior
  type: enum
  values: [hold_last_look, fade_to_0, cue, disable_dmx]
  description: "Behavior on DMX signal loss"

- id: signal_loss_hold_timeout
  type: enum
  values: [forever, 0s, 10s, 30s, 1m, 5m, 10m, 60m]
  description: "Timeout for Hold Last Look before transitioning to signal_loss_behavior"

- id: signal_loss_fade_time
  type: integer
  range: [0, 60]
  description: "Crossfade time to DMX 0 (seconds); default 30s; 0 = instant"

- id: signal_loss_cue
  type: integer
  description: "Cue started on signal loss when behavior = cue"
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification protocol documented
```

## Macros
```yaml
# Cue recall (1-99) via Remote Input trigger
# Netron Preset recall (a, b, c, …) via Remote Input trigger
# User Preset recall (1-10) via Remote Input trigger
# Disable DMX via Remote Input trigger
# Send static DMX value (0-255) via Remote Input trigger
# Signal Loss sequence: Hold Last Look → timeout → {Fade to 0 | Cue | Disable DMX}
# Startup sequence: {Cue | Wait for Data | Send 0}
```

## Safety
```yaml
confirmation_required_for:
  - factory_reset_full
  - factory_reset_user_preset
interlocks:
  - "Do not power cycle during firmware update (Display NFW or Web IMG)"
# UNRESOLVED: no other safety-critical commands or interlock procedures stated in source
```

## Notes
- Device configured entirely via onboard display menus and web browser UI — no discrete serial command protocol exists.
- Up to 10 Netron devices can be daisy-chained via Ethernet; exceeding 10 in one chain is not recommended.
- Default IP mode: factory-assigned unique 2.x.x.x address (subnet 255.0.0.0). Auto modes also for 10.x, 192.x, 172.x; DHCP supported. EP4 (no display) defaults to 2.0.0.1.
- If DHCP fails for 30s, device auto-assigns a 169.254.x.x address but continues monitoring DHCP.
- RDM not supported on sACN; supported on Art-Net.
- DMX output connectors: EN12 uses 5-pin female XLR (pin 1 Com, pin 2 Data−, pin 3 Data+; pins 4/5 unused — ESTA compliant); EN12-45 uses RJ45 (pin 1 Data+, pin 2 Data−, pins 7/8 Com, shield Earth).
- Device lock PIN default is 011; full factory reset PIN is 011; user-preset reset PIN is 007.
- Firmware update requires two files (Display NFW + Web IMG) uploaded via System > Maintenance web interface; do not power cycle during update.
- Recovery update URL: http://{device_ip}/update.html (used when System menu is corrupt).
- Owner Preset lock accessed via hidden URL http://{device_ip}/Preset_Owner.htm — not part of main web UI.
- DMX port status LEDs: Red solid = error; Green solid = DMX In, Green blink = DMX Lost; Blue solid = DMX Out Stable, Blue blink = DMX Lost; White flashing = RDM packets.
- Source references EN4/EP4 models in some menus; this spec covers EN and EN-12 only.
- Art-Net™ incorporated under Artistic License Holdings Ltd design/copyright.
<!-- UNRESOLVED: Art-Net (6454) and sACN (5568) UDP ports not stated in source -->
<!-- UNRESOLVED: web interface HTTP port not stated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: protocol versions (Art-Net 3/4, sACN E1.31) not stated in source -->
```

Spec upgraded. Added: 16 actions (DMX trigger + 5 remote assignments + owner-preset lock + lock/unlock + save/load config + RDM enable/disable + 2 factory resets + 2 firmware uploads + recovery update), 30+ variables (per-port DMX, per-slot remote, IP, system, signal-loss), LED feedback enum, safety confirmations. Bumped revision 1→2, fixed transport tcp→http+udp.

## Provenance

```yaml
source_domains:
  - ltb.no
  - obsidiancontrol.com
  - forum.obsidiancontrol.com
source_urls:
  - "https://ltb.no/media/multicase/documents/netron/netron%20en4%20ep4%20en12%20en12-45%20-%20user%20guide%202022-05-25.pdf"
  - https://www.obsidiancontrol.com/products/en4
  - https://www.obsidiancontrol.com/products/en12
  - https://forum.obsidiancontrol.com
retrieved_at: 2026-07-17T16:13:31.305Z
last_checked_at: 2026-07-21T23:41:22.994Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T23:41:22.994Z
matched_actions: 18
action_count: 18
confidence: medium
summary: "All 18 spec actions matched to source commands; no extraneous commands; transport parameters verified. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Art-Net (6454) and sACN (5568) UDP port numbers not stated in source"
- "web interface HTTP port not stated in source"
- "no ASCII/serial command reference — control via web UI, device menus, and DMX value triggers only"
- "web interface TCP port not stated in source"
- "powerable - no power on/off commands documented; device is a gateway"
- "routable - DMX port routing configured via menus/web UI, not discrete commands"
- "queryable - device state observable via web UI and onboard display, no query command protocol documented"
- "no unsolicited notification protocol documented"
- "no other safety-critical commands or interlock procedures stated in source"
- "Art-Net (6454) and sACN (5568) UDP ports not stated in source"
- "firmware version compatibility not stated in source"
- "protocol versions (Art-Net 3/4, sACN E1.31) not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
