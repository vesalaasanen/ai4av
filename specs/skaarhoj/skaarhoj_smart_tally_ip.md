---
spec_id: admin/skaarhoj-smart-tally
schema_version: ai4av-public-spec-v1
revision: 1
title: "SKAARHOJ Smart Tally Control Spec"
manufacturer: SKAARHOJ
model_family: "Smart Tally"
aliases: []
compatible_with:
  manufacturers:
    - SKAARHOJ
  models:
    - "Smart Tally"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pid.skaarhoj.com
  - skaarhoj.com
source_urls:
  - https://pid.skaarhoj.com/Manuals/SKAARHOJ_manual-SMART-TALLY-V1.pdf
  - https://www.skaarhoj.com/raw-panel
retrieved_at: 2026-06-29T20:33:36.443Z
last_checked_at: 2026-06-30T07:14:05.174Z
generated_at: 2026-06-30T07:14:05.174Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "HTTP/TCP base host addressing and device IP discovery (DHCP/static) is configuration-dependent; no fixed hostname in source. Firmware version compatibility not stated."
  - "data bits not explicitly stated in source"
  - "parity not explicitly stated in source"
  - "stop bits not explicitly stated in source"
  - "no push/event channel documented in source."
  - "populate if a firmware revision adds macro support."
  - "firmware version compatibility not stated."
  - "serial data_bits / parity / stop_bits not explicitly stated (only baud 115200 stated for Raw Panel USB mode)."
  - "full Raw Panel command catalogue beyond `list` not in this source."
  - "getInfo JSON field schema not enumerated in source."
  - "relay and physical buttons referenced in HTTP state JSON but not described as physical hardware on Smart Tally (likely simulated-only endpoints)."
verification:
  verdict: verified
  checked_at: 2026-06-30T07:14:05.174Z
  matched_actions: 25
  action_count: 25
  confidence: medium
  summary: "All 25 spec actions matched literally in source; transport parameters verified; 25/25 coverage (1.0) exceeds 0.9 floor. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-29
---

# SKAARHOJ Smart Tally Control Spec

## Summary
The SKAARHOJ Smart Tally is a PoE-powered Ethernet tally lamp for live production, featuring front and rear LED indicators (Red, Green, Amber, Off). It is controllable via the SKAARHOJ Raw Panel protocol over TCP (port 9923), TSL v3.1/v5.0 over UDP (port 7001), a simple HTTP REST API, and a USB-C serial console. This spec covers all four documented control interfaces plus the device's web-configuration command set.

<!-- UNRESOLVED: HTTP/TCP base host addressing and device IP discovery (DHCP/static) is configuration-dependent; no fixed hostname in source. Firmware version compatibility not stated. -->

## Transport
```yaml
protocols:
  - tcp
  - udp
  - http
  - serial
addressing:
  # Raw Panel TCP server (SKAARHOJ protocol), advertised via mDNS
  port: 9923
  # HTTP/REST base path prefix; full device base URL not fixed in source
  base_url: "http://<device_ip>"  # device IP set via DHCP or serial ip= command
  udp_port: 7001  # TSL v3.1 / v5.0 listener
serial:
  baud_rate: 115200
  data_bits: 8      # UNRESOLVED: data bits not explicitly stated in source
  parity: none      # UNRESOLVED: parity not explicitly stated in source
  stop_bits: 1      # UNRESOLVED: stop bits not explicitly stated in source
auth:
  # HTTP API uses HTTP Basic auth, credentials in cleartext (default admin/skaarhoj).
  # TCP Raw Panel: optional single-client-IP restriction (no token in source).
  # Serial console: no auth documented.
  type: basic
  scheme: http_basic  # cleartext; source warns: trusted local networks only
  default_username: admin
  default_password: skaarhoj
```

## Traits
```yaml
traits:
  - levelable   # inferred: front/rear intensity sliders 0-8 (source 5.2)
  - queryable   # inferred: getInfo / dumpIP / ip= / ping return values
```

## Actions
```yaml
# HTTP REST API (see 5.6). All return JSON device state.
- id: http_set_lamp_color
  label: Set Lamp Color (HTTP)
  kind: action
  command: "GET /tally/{lamp}/{color}"
  params:
    - name: lamp
      type: string
      description: "front or rear"
    - name: color
      type: string
      description: "red, green, or amber"

- id: http_lamp_off
  label: Turn Lamp Off (HTTP)
  kind: action
  command: "GET /tally/{lamp}/off"
  params:
    - name: lamp
      type: string
      description: "front or rear"

- id: http_toggle_lamp
  label: Toggle Lamp Color (HTTP)
  kind: action
  command: "GET /tally/{lamp}/toggle/{color}"
  params:
    - name: lamp
      type: string
      description: "front or rear"
    - name: color
      type: string
      description: "red, green, or amber"

- id: http_reset_simulated_state
  label: Reset Simulated Button/GPI State
  kind: action
  command: "GET /reset_simulated_state"
  params: []

# USB Serial Monitor commands (see 4.6). Plain text, newline-terminated.
- id: serial_help
  label: Show Serial Help
  kind: query
  command: "help"
  params: []

- id: serial_set_ip_static
  label: Set Static IP
  kind: action
  command: "ip={a.b.c.d}"
  params:
    - name: a.b.c.d
      type: string
      description: "Static IPv4 address"

- id: serial_set_ip_dhcp
  label: Enable DHCP
  kind: action
  command: "ip=0.0.0.0"
  params: []

- id: serial_query_ip
  label: Query Current IP
  kind: query
  command: "ip=?"
  params: []

- id: serial_set_subnet
  label: Set Subnet Mask
  kind: action
  command: "subnet={a.b.c.d}"
  params:
    - name: a.b.c.d
      type: string
      description: "Subnet mask"

- id: serial_set_gateway
  label: Set Gateway
  kind: action
  command: "gateway={a.b.c.d}"
  params:
    - name: a.b.c.d
      type: string
      description: "Gateway IPv4 address"

- id: serial_set_dns
  label: Set DNS Server
  kind: action
  command: "dns={a.b.c.d}"
  params:
    - name: a.b.c.d
      type: string
      description: "DNS server IPv4 address"

- id: serial_reset
  label: Soft Reset
  kind: action
  command: "reset"
  params: []

- id: serial_reboot
  label: Reboot (alias of reset)
  kind: action
  command: "reboot"
  params: []

- id: serial_notick
  label: Disable Dot/Loopcount Output
  kind: action
  command: "notick"
  params: []

- id: serial_ping
  label: Ping (returns ack)
  kind: query
  command: "ping"
  params: []

- id: serial_debug
  label: Enable Debug Mode Until Reboot
  kind: action
  command: "debug"
  params: []

- id: serial_sockets
  label: Show Socket Status
  kind: query
  command: "sockets"
  params: []

- id: serial_newmac
  label: Generate and Save New MAC Address
  kind: action
  command: "newmac"
  params: []

- id: serial_reset_all
  label: Clear User Settings and Reset
  kind: action
  command: "_resetAll"
  params: []

- id: serial_get_cid
  label: Get Device CID
  kind: query
  command: "getCID"
  params: []

- id: serial_get_info
  label: Display Detailed Device Status (JSON)
  kind: query
  command: "getInfo"
  params: []

- id: serial_dump_ip
  label: Display IP Configuration
  kind: query
  command: "dumpIP"
  params: []

- id: serial_set_ethautoneg
  label: Set Ethernet PHY Auto-Negotiation
  kind: action
  command: "ethautoneg={0|1}"
  params:
    - name: value
      type: integer
      description: "0=disable, 1=enable (reboot to apply)"
  notes: "Reboot required to apply. Also settable via web UI (4.4.1)."

- id: serial_enter_rawpanel_mode
  label: Enter Raw Panel Mode on USB
  kind: action
  command: "serialRawPanel"
  params: []
  notes: "Switches USB to Raw Panel protocol; disables all other serial comms. Exit only by power-cycling."

# Raw Panel over TCP (port 9923) - example command documented in source (4.7)
- id: rawpanel_list
  label: Raw Panel List
  kind: query
  command: "list"
  params: []
  notes: "Example Raw Panel command over USB/TCP. Source does not enumerate full Raw Panel command set."
```

## Feedbacks
```yaml
# HTTP endpoints return this JSON state object (5.6 Response Format)
- id: device_state
  type: object
  schema: |
    { "front": "<red|green|amber|off>", "rear": "<red|green|amber|off>",
      "relay": <bool>, "buttons": [<bool>, <bool>, <bool>, <bool>] }

# Serial console responses
- id: ack
  type: string
  values: ["ack"]
  notes: "Returned by the `ping` serial command."

- id: device_info_json
  type: json
  notes: "Returned by `getInfo`. Detailed field set not enumerated in source."

- id: ip_configuration
  type: text
  notes: "Returned by `dumpIP` and `ip=?`."

- id: cid
  type: string
  notes: "Returned by `getCID`."

# Live connection status reported in web Overview tab (5.3)
- id: rawpanel_clients
  type: list
  notes: "Connected Raw Panel client IP addresses."
```

## Variables
```yaml
# Lamp intensity per lamp (web UI sliders, 5.2). Payload path via HTTP/serial
# not explicitly documented - control is via the web Lamp tab.
- id: front_lamp_intensity
  type: integer
  range: [0, 8]
  description: "0=Off; 1-8 increasing brightness. Set via web Lamp tab."

- id: rear_lamp_intensity
  type: integer
  range: [0, 8]
  description: "0=Off; 1-8 increasing brightness. Set via web Lamp tab."

# TSL per-lamp mapping rows (4 rows per lamp, 5.5). Configured via web TSL tab;
# no direct command payload documented for programmatic set.
- id: tsl_mapping
  type: object
  per_lamp: [front, rear]
  rows: 4
  fields: [mode, address, bit, screen, index, led_position, color]
  notes: "Mode: off|tsl3.1|tsl5.0. Color palette index 1-16 (0=blank). Set via web UI."

# Direct-switcher rule tables per lamp (5.7). Configured via web Devices tab.
- id: device_rule
  type: object
  per_lamp: [front, rear]
  fields: [show_color, camera_or_source, bus]
  notes: "First-match-wins, top to bottom. Bus options differ per switcher type."

# Raw Panel optional client restriction (5.4)
- id: rawpanel_client_ip_restriction
  type: string
  description: "Optional single client IP allowed to connect to TCP 9923."
```

## Events
```yaml
# No unsolicited device-originated notifications are documented on the control
# interfaces. The device is a listener (TSL UDP) and server (Raw Panel TCP, HTTP).
# Live status appears only in the web UI, not as pushed events.
# UNRESOLVED: no push/event channel documented in source.
```

## Macros
```yaml
# No explicit multi-step sequences documented in source.
# UNRESOLVED: populate if a firmware revision adds macro support.
```

## Safety
```yaml
confirmation_required_for:
  - "_resetAll"          # clears all user settings
  - "newmac"             # changes device MAC, may affect network identity
  - "ip=..."             # changing IP may disconnect current session
interlocks:
  - description: >
      Service conflict (5.3): Raw Panel, TSL, and Devices direct-connection all
      compete for lamp control. Only one controlling service should be active at
      a time for predictable behavior. The web UI warns when multiple are enabled.
  - description: >
      Lamp ownership (5.7): when a lamp has any Devices rule configured, that lamp
      is driven by Devices and cannot be overridden from Lamp tab, Raw Panel, or TSL.
warnings:
  - >
      HTTP Basic auth credentials are transmitted in cleartext. Source explicitly
      warns: use only on trusted local networks; do not expose to the internet
      without VPN/firewall (Unencrypted Login Credentials section).
```

## Notes
- Device identity: PoE-powered Ethernet tally lamp, dual front/rear LEDs (Red/Green/Amber/Off). Powered via PoE (IEEE 802.3af/t) or USB-C 5V.
- Raw Panel HWC mapping (Standard model): HWC 1 = Front Lamp (Display/color), HWC 2 = Rear Lamp (Display/color).
- USB-C port serves dual purpose: 5V power AND serial communication with SKAARHOJ Discovery.
- Raw Panel over USB requires opening the port at 115200 bps, sending `serialRawPanel\n` first, then Raw Panel commands. Power-cycle required to exit this mode.
- HTTP credentials may be embedded in URL: `http://admin:<password>@<device_ip>/tally/front/red` (cleartext).
- The full SKAARHOJ Raw Panel protocol command set (beyond `list`) is not documented in this source; consult the Raw Panel SDK for complete coverage.
- Direct switcher follow mode supports ATEM, vMix, and NewTek TriCaster. TriCaster sources: Input 1-44, DDR 1-4, Buffer 1-15, V1-V8, GFX 1-2.

<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: serial data_bits / parity / stop_bits not explicitly stated (only baud 115200 stated for Raw Panel USB mode). -->
<!-- UNRESOLVED: full Raw Panel command catalogue beyond `list` not in this source. -->
<!-- UNRESOLVED: getInfo JSON field schema not enumerated in source. -->
<!-- UNRESOLVED: relay and physical buttons referenced in HTTP state JSON but not described as physical hardware on Smart Tally (likely simulated-only endpoints). -->

## Provenance

```yaml
source_domains:
  - pid.skaarhoj.com
  - skaarhoj.com
source_urls:
  - https://pid.skaarhoj.com/Manuals/SKAARHOJ_manual-SMART-TALLY-V1.pdf
  - https://www.skaarhoj.com/raw-panel
retrieved_at: 2026-06-29T20:33:36.443Z
last_checked_at: 2026-06-30T07:14:05.174Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-30T07:14:05.174Z
matched_actions: 25
action_count: 25
confidence: medium
summary: "All 25 spec actions matched literally in source; transport parameters verified; 25/25 coverage (1.0) exceeds 0.9 floor. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "HTTP/TCP base host addressing and device IP discovery (DHCP/static) is configuration-dependent; no fixed hostname in source. Firmware version compatibility not stated."
- "data bits not explicitly stated in source"
- "parity not explicitly stated in source"
- "stop bits not explicitly stated in source"
- "no push/event channel documented in source."
- "populate if a firmware revision adds macro support."
- "firmware version compatibility not stated."
- "serial data_bits / parity / stop_bits not explicitly stated (only baud 115200 stated for Raw Panel USB mode)."
- "full Raw Panel command catalogue beyond `list` not in this source."
- "getInfo JSON field schema not enumerated in source."
- "relay and physical buttons referenced in HTTP state JSON but not described as physical hardware on Smart Tally (likely simulated-only endpoints)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
