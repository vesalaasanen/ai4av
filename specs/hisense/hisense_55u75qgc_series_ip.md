---
spec_id: admin/hisense-55u75qgc-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Hisense 55U75QGC Series Control Spec"
manufacturer: Hisense
model_family: "55U75QGC Series"
aliases: []
compatible_with:
  manufacturers:
    - Hisense
  models:
    - "55U75QGC Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - hisense-b2b.com
  - drivers-api.crestron.io
source_urls:
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=784"
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
  - https://drivers-api.crestron.io/help/driver/6277
  - https://www.hisense-b2b.com/
retrieved_at: 2026-06-02T21:49:51.130Z
last_checked_at: 2026-06-30T07:05:07.321Z
generated_at: 2026-06-30T07:05:07.321Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "the source guide does not explicitly name the 55U75QGC model or"
  - "Verify/checksum byte algorithm not described in source; only"
  - "no separately-defined settable parameter table outside the"
  - "no unsolicited notification events described in source. The display"
  - "no multi-step command sequences described in source."
  - "source contains no explicit safety warnings, interlock procedures,"
verification:
  verdict: verified
  checked_at: 2026-06-30T07:05:07.321Z
  matched_actions: 30
  action_count: 30
  confidence: medium
  summary: "All 30 spec action-units (27 actions + 3 query feedbacks) directly substantiated verbatim in BM/GM series command table; transport port 8088 confirmed; complete coverage of the documented command set this spec targets. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-25
---

# Hisense 55U75QGC Series Control Spec

## Summary
IP control spec for the Hisense 55U75QGC Series flat panel display over TCP/IP.
Scope is the BM/GM series command set (ASCII-framed) from the Hisense IP Control
Guide: power, screen on/off, volume/mute, source selection, picture mode, and
status inquiries. The display runs an IP Control server on the local LAN that a
TCP client connects to in order to send and receive ASCII command frames.

<!-- UNRESOLVED: the source guide does not explicitly name the 55U75QGC model or -->
<!-- its product series. The BM/GM series command set was selected for this spec -->
<!-- because the deterministic extraction mapped the device's command catalogue to -->
<!-- the BM/GM series table (ASCII frames, default port 8088). Confirm against the -->
<!-- device or a 55U75QGC-specific document before publishing. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 8088  # BM/GM series default per source
auth:
  type: none  # inferred: no auth procedure in source
```

The source documents three Hisense product families, each with a distinct
default port and command encoding:

| Series | Format | Default port |
|--------|--------|--------------|
| E | HEX | 5000 |
| BM/GM | ASCII | 8088 |
| DM/GM50D | HEX | 8000 |

This spec targets the **BM/GM series** (ASCII, port 8088). Connection steps from
the source: launch the IP Control app on the display (Settings → Remote Control →
Network control → Enable); the server starts automatically; on the control PC use
a TCP client (e.g. Net Assist) in "TCP Client" mode, enter the display IP and
port 8088, and connect. If 8088 is occupied, choose a port in the 5000–12000
range.

BM/GM ASCII frame layout (from source command table):

```
StartCode | Length | CommandCode | ID | Data | Verify | EndCode
DD FF     | 00 xx  | C1 .. .. .. | 01 | XX.. | YY     | BB CC
```

- Start code (send): `DD FF` — receive (display→PC): `AB AB`
- End code (send): `BB CC` — receive: `CD CD`
- `ID` field is `01` in the documented examples
- `Verify` is a per-frame checksum byte (literal values given per command in the
  source table); its computation algorithm is not documented

<!-- UNRESOLVED: Verify/checksum byte algorithm not described in source; only -->
<!-- literal computed values appear per command. -->

## Traits
```yaml
traits:
  - powerable  # inferred: power on/off and screen on/off commands present
  - levelable  # inferred: set volume, brightness, contrast commands present
  - queryable  # inferred: inquire function / source / smart-backlight queries present
  - routable   # inferred: switch source command present
```

## Actions
```yaml
# All payloads are verbatim hex byte sequences from the source. Bytes use
# the source's "NNh" notation; {NAME} tokens are parameters substituted at
# send time. No bytes are reformatted from the source.

- id: screen_on_off_on_send_command
  label: "Screen on/off On Send command"
  kind: action
  command: "DD FF 00 07 C1 31 00 01 01 01 F6 BB CC"
  params: []

- id: screen_on_off_on_receive_command
  label: "Screen on/off On Receive command"
  kind: action
  command: "AB AB 00 07 C1 31 00 01 01 01 F6 CD CD"
  params: []

- id: screen_on_off_off_send_command
  label: "Screen on/off Off Send command"
  kind: action
  command: "DD FF 00 07 C1 31 00 01 01 00 F7 BB CC"
  params: []

- id: screen_on_off_off_receive_command
  label: "Screen on/off Off Receive command"
  kind: action
  command: "AB AB 00 07 C1 31 00 01 01 00 F7 CD CD"
  params: []

- id: reboot_the_hisense_display_send_command
  label: "Reboot the HISENSE DISPLAY Send command"
  kind: action
  command: "DD FF 00 06 C1 1E 00 00 01 D8 BB CC"
  params: []

- id: reboot_the_hisense_display_receive_command
  label: "Reboot the HISENSE DISPLAY Receive command"
  kind: action
  command: "AB AB 00 06 C1 1E 00 00 01 D8 CD CD"
  params: []

- id: power_on_off_power_on_send_command
  label: "Power On/Off Power on Send command"
  kind: action
  command: "DD FF 00 08 C1 15 00 00 01 BB BB DD BB CC"
  params: []

- id: power_on_off_power_on_receive_command
  label: "Power On/Off Power on Receive command"
  kind: action
  command: "AB AB 00 08 C1 15 00 00 01 BB BB DD CD CD"
  params: []

- id: power_on_off_power_off_send_command
  label: "Power On/Off Power off Send command"
  kind: action
  command: "DD FF 00 08 C1 15 00 00 01 AA AA DD BB CC"
  params: []

- id: power_on_off_power_off_receive_command
  label: "Power On/Off Power off Receive command"
  kind: action
  command: "AB AB 00 08 C1 15 00 00 01 AA AA DD CD CD"
  params: []

- id: mute_control_mute_off_send_command
  label: "Mute Control Mute off Send command"
  kind: action
  command: "DD FF 00 07 C1 26 00 00 01 00 E1 BB CC"
  params: []

- id: mute_control_mute_off_receive_command
  label: "Mute Control Mute off Receive command"
  kind: action
  command: "AB AB 00 07 C1 26 00 00 01 00 E1 CD CD"
  params: []

- id: mute_control_mute_on_send_command
  label: "Mute Control Mute on Send command"
  kind: action
  command: "DD FF 00 07 C1 26 00 00 01 01 E0 BB CC"
  params: []

- id: mute_control_mute_on_receive_command
  label: "Mute Control Mute on Receive command"
  kind: action
  command: "AB AB 00 07 C1 26 00 00 01 01 E0 CD CD"
  params: []

- id: vga_automatic_adjustment_send_command
  label: "VGA Automatic Adjustment Send command"
  kind: action
  command: "DD FF 00 06 C1 01 00 00 01 C7 BB CC"
  params: []

- id: vga_automatic_adjustment_receive_command
  label: "VGA Automatic Adjustment Receive command"
  kind: action
  command: "AB AB 00 06 C1 01 00 00 01 C7 CD CD"
  params: []

- id: restore_factory_settings_send_command
  label: "Restore Factory Settings Send command"
  kind: action
  command: "DD FF 00 06 C1 10 00 00 01 D6 BB CC"
  params: []

- id: restore_factory_settings_receive_command
  label: "Restore Factory Settings Receive command"
  kind: action
  command: "AB AB 00 06 C1 10 00 00 01 D6 CD CD"
  params: []

- id: set_inquiring_screen_on_off_send_command
  label: "Set Inquiring Screen On/Off Send command"
  kind: action
  command: "DD FF 00 06 C1 32 00 01 01 F5 BB CC"
  params: []

- id: picture_mode_standard_send_command
  label: "Picture Mode - Standard Send command"
  kind: action
  command: "DD FF 00 07 C1 0F 06 00 01 07 C9 BB CC"
  params: []

- id: picture_mode_standard_receive_command
  label: "Picture Mode - Standard Receive command"
  kind: action
  command: "AB AB 00 07 C1 0F 06 00 01 07 C9 CD CD"
  params: []

- id: picture_mode_soft_send_command
  label: "Picture Mode - Soft Send command"
  kind: action
  command: "DD FF 00 07 C1 0F 06 00 01 09 C7 BB CC"
  params: []

- id: picture_mode_soft_receive_command
  label: "Picture Mode - Soft Receive command"
  kind: action
  command: "AB AB 00 07 C1 0F 06 00 01 09 C7 CD CD"
  params: []

- id: picture_mode_movie_send_command
  label: "Picture Mode - Movie Send command"
  kind: action
  command: "DD FF 00 07 C1 0F 06 00 01 0A C4 BB CC"
  params: []

- id: picture_mode_movie_receive_command
  label: "Picture Mode - Movie Receive command"
  kind: action
  command: "AB AB 00 07 C1 0F 06 00 01 0A C4 CD CD"
  params: []

- id: picture_mode_vivid_send_command
  label: "Picture Mode - Vivid Send command"
  kind: action
  command: "DD FF 00 07 C1 0F 06 00 01 08 C6 BB CC"
  params: []

- id: picture_mode_vivid_receive_command
  label: "Picture Mode - Vivid Receive command"
  kind: action
  command: "AB AB 00 07 C1 0F 06 00 01 08 C6 CD CD"
  params: []
```

## Feedbacks
```yaml
- id: get_smart_backlight_send_command
  label: "Get Smart Backlight Send command"
  kind: query
  query_command: "DD FF 00 06 C1 3E 00 01 01 F9 BB CC"

- id: inquire_function_command_send_command
  label: "Inquire Function Command Send command"
  kind: query
  query_command: "DD FF 00 06 C1 28 00 00 01 EE BB CC"

- id: inquire_current_source_command_send_command
  label: "Inquire Current Source Command Send command"
  kind: query
  query_command: "DD FF 00 06 C1 1A 00 00 01 DC BB CC"
```

## Variables
```yaml
# UNRESOLVED: no separately-defined settable parameter table outside the
# command catalogue. Per-command parameters (volume value, brightness value,
# colour-temperature enum, rotation degrees, etc.) are carried on their
# respective actions.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification events described in source. The display
# responds to commands but no push/event mechanism is documented.
```

## Macros
```yaml
# UNRESOLVED: no multi-step command sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements. Restore Factory Settings and Reboot
# commands are present but carry no documented confirmation/interlock policy.
```

## Notes
- **Source coverage:** the refined source is a generic "Hisense IP Control Guide"
  covering E, BM/GM, and DM/GM50D product series. It is not a 55U75QGC-specific
  document; the model and its exact series membership are not named. See the
  UNRESOLVED marker in Summary.
- **BM/GM ASCII framing:** all commands use the `DD FF … BB CC` (send) /
  `AB AB … CD CD` (receive) envelope. Send/receive frames mirror each other with
  differing start/end codes; the `Verify` checksum byte differs between send and
  receive for the same logical command.
- **Per-series feature gating:** several BM/GM rows are annotated with model
  restrictions in the source (e.g. "811 not support" for Screen Rotation, Zoom,
  Boot Time Delay, Protect against screen burn; "only 551 support" for screen
  burn protection). Applicability to 55U75QGC is unverified.
- **Wake on LAN:** source documents WOL as a wired-LAN wake mechanism (magic
  packet), enabled via Settings → Switch on/off → Wake-on LAN. This is a
  separate transport path from the TCP command channel.
- **Source title mismatch:** the refined document is headed "Hisense 85U9LUA
  Series — IP Control Guide" but its body is series-generic.

<!-- UNRESOLVED: -->
<!-- - Exact product-series membership of 55U75QGC not confirmed by source. -->
<!-- - Checksum/verify byte algorithm undocumented (only literal values given). -->
<!-- - Model-gating notes (551/811 support) not mappable to 55U75QGC. -->
<!-- - Firmware version compatibility range not stated. -->
<!-- - Whether the E-series (HEX, port 5000) or DM/GM50D (HEX, port 8000) command -->
<!--   sets also apply to this device is unknown. -->

## Provenance

```yaml
source_domains:
  - hisense-b2b.com
  - drivers-api.crestron.io
source_urls:
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=784"
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
  - https://drivers-api.crestron.io/help/driver/6277
  - https://www.hisense-b2b.com/
retrieved_at: 2026-06-02T21:49:51.130Z
last_checked_at: 2026-06-30T07:05:07.321Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-30T07:05:07.321Z
matched_actions: 30
action_count: 30
confidence: medium
summary: "All 30 spec action-units (27 actions + 3 query feedbacks) directly substantiated verbatim in BM/GM series command table; transport port 8088 confirmed; complete coverage of the documented command set this spec targets. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "the source guide does not explicitly name the 55U75QGC model or"
- "Verify/checksum byte algorithm not described in source; only"
- "no separately-defined settable parameter table outside the"
- "no unsolicited notification events described in source. The display"
- "no multi-step command sequences described in source."
- "source contains no explicit safety warnings, interlock procedures,"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
