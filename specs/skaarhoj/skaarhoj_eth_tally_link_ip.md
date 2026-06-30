---
spec_id: admin/skaarhoj-eth-tally-link
schema_version: ai4av-public-spec-v1
revision: 1
title: "Skaarhoj Eth Tally Link Control Spec"
manufacturer: Skaarhoj
model_family: "Eth Tally Link"
aliases: []
compatible_with:
  manufacturers:
    - Skaarhoj
  models:
    - "Eth Tally Link"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pid.skaarhoj.com
  - skaarhoj.com
source_urls:
  - https://pid.skaarhoj.com/Manuals/SKAARHOJ_manual-ETH-TALLY-LINK-V3.pdf
  - https://www.skaarhoj.com/product/eth-tally-link
  - https://www.skaarhoj.com/raw-panel
retrieved_at: 2026-06-29T20:31:44.691Z
last_checked_at: 2026-06-30T07:12:12.473Z
generated_at: 2026-06-30T07:12:12.473Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Tally Box / Eth Tally Link model disambiguation not explicit in source."
  - "auth scheme on Raw Panel (TCP/9923) and TSL (UDP/7001) not separately specified in source."
  - "source documents no unsolicited notification format."
  - "source does not document multi-step sequences beyond factory-reset / enable Raw Panel mode."
  - "detailed electrical / fault-recovery procedures not stated in source."
  - "TSL on-wire packet format not enumerated; Raw Panel wire-format beyond example commands not detailed; HTTP response schema beyond example not specified."
verification:
  verdict: verified
  checked_at: 2026-06-30T07:12:12.473Z
  matched_actions: 31
  action_count: 31
  confidence: medium
  summary: "All 31 spec actions matched literally with verbatim source evidence; HTTP API, Raw Panel, and serial commands fully documented in source. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-29
---

# Skaarhoj Eth Tally Link Control Spec

## Summary
SKAARHOJ Tally Box / Eth Tally Link: compact IP device with eight RJ-45 outputs driving red and green tally lamps for up to eight cameras. Supports Raw Panel protocol over TCP (port 9923), TSL v3.1/v5.0 over UDP (port 7001), and a REST-style HTTP API for tally control and automation.

<!-- UNRESOLVED: Tally Box / Eth Tally Link model disambiguation not explicit in source. -->

## Transport
```yaml
protocols:
  - tcp
  - udp
  - http
addressing:
  base_url: http://<device_ip>/tally/<color>/<channel>/<action>
  tcp_port: 9923
  udp_port: 7001
auth:
  type: password
  username: admin
  password: skaarhoj
  notes: HTTP basic-auth credentials may be embedded in URL as http://admin:<password>@<ip>/... (insecure; trusted networks only). Web UI supports "Allow access without login" advanced setting. # UNRESOLVED: auth scheme on Raw Panel (TCP/9923) and TSL (UDP/7001) not separately specified in source.
```

## Traits
```yaml
- routable  # inferred from per-camera tally routing and output mapping
- queryable  # inferred from HTTP GET returning state
```

## Actions
```yaml
- id: set_tally_red
  label: Set Camera Red Tally
  kind: action
  command: "GET {base_url}/tally/red/{channel}/set"
  params:
    - name: channel
      type: integer
      description: Camera number (1-8)
- id: set_tally_green
  label: Set Camera Green Tally
  kind: action
  command: "GET {base_url}/tally/green/{channel}/set"
  params:
    - name: channel
      type: integer
      description: Camera number (1-8)
- id: clear_tally_red
  label: Clear Camera Red Tally
  kind: action
  command: "GET {base_url}/tally/red/{channel}/clear"
  params:
    - name: channel
      type: integer
      description: Camera number (1-8)
- id: clear_tally_green
  label: Clear Camera Green Tally
  kind: action
  command: "GET {base_url}/tally/green/{channel}/clear"
  params:
    - name: channel
      type: integer
      description: Camera number (1-8)
- id: toggle_tally_red
  label: Toggle Camera Red Tally
  kind: action
  command: "GET {base_url}/tally/red/{channel}/toggle"
  params:
    - name: channel
      type: integer
      description: Camera number (1-8)
- id: toggle_tally_green
  label: Toggle Camera Green Tally
  kind: action
  command: "GET {base_url}/tally/green/{channel}/toggle"
  params:
    - name: channel
      type: integer
      description: Camera number (1-8)
- id: clear_all_tallies
  label: Clear All Tallies
  kind: action
  command: "GET {base_url}/tally/clear"
- id: get_tally_state
  label: Get Tally State
  kind: query
  command: "GET {base_url}/tally/{color}/{channel}"
  params:
    - name: color
      type: enum
      values: [red, green]
    - name: channel
      type: integer
      description: Camera number (1-8)
- id: raw_panel_hwc_set
  label: Raw Panel Set HWC
  kind: action
  command: "HWC#{hwc}={value}"
  params:
    - name: hwc
      type: integer
      description: Hardware Component ID (1=Cam1 Red, 2=Cam1 Green, 3=Cam2 Red, 4=Cam2 Green, ... up to 16=Cam8 Green)
    - name: value
      type: integer
      description: 0=off, non-zero=on (example: 32 turns Camera 1 Red on)
  notes: Send over TCP port 9923. Raw Panel protocol.
- id: raw_panel_clear
  label: Raw Panel Clear All Tallies
  kind: action
  command: "Clear"
  notes: Send over TCP port 9923. Clears all tally outputs.
- id: serial_help
  label: Serial Monitor Help
  kind: query
  command: "help"
  notes: USB serial (Micro USB) on SKAARHOJ devices. Plain text commands.
- id: serial_set_ip
  label: Serial Set Static IP
  kind: action
  command: "ip=a.b.c.d"
  params:
    - name: ip
      type: string
      description: Static IP, or 0.0.0.0 for DHCP
  notes: USB serial. Reboot required.
- id: serial_set_subnet
  label: Serial Set Subnet Mask
  kind: action
  command: "subnet=a.b.c.d"
  notes: USB serial.
- id: serial_set_gateway
  label: Serial Set Gateway
  kind: action
  command: "gateway=a.b.c.d"
  notes: USB serial.
- id: serial_set_dns
  label: Serial Set DNS
  kind: action
  command: "dns=a.b.c.d"
  notes: USB serial.
- id: serial_reset
  label: Serial Soft Reset
  kind: action
  command: "reset"
  notes: USB serial. Reboots device.
- id: serial_notick
  label: Serial Disable Tick Output
  kind: action
  command: "notick"
  notes: USB serial. Disables dot and loopcount output every second.
- id: serial_ping
  label: Serial Ping
  kind: query
  command: "ping"
  notes: USB serial. Returns ack.
- id: serial_debug
  label: Serial Enable Debug
  kind: action
  command: "debug"
  notes: USB serial. Enable debug mode until reboot.
- id: serial_sockets
  label: Serial Show Socket Status
  kind: query
  command: "sockets"
  notes: USB serial.
- id: serial_newmac
  label: Serial Generate New MAC
  kind: action
  command: "newmac"
  notes: USB serial. Generate and save a new MAC address.
- id: serial_resetAll
  label: Serial Factory Reset
  kind: action
  command: "_resetAll"
  notes: USB serial. Clear user settings and reset.
- id: serial_getCID
  label: Serial Get Device CID
  kind: query
  command: "getCID"
  notes: USB serial.
- id: serial_getInfo
  label: Serial Get Device Status JSON
  kind: query
  command: "getInfo"
  notes: USB serial. Returns detailed device status in JSON.
- id: serial_get_ip
  label: Serial Get Current IP
  kind: query
  command: "ip=?"
  notes: USB serial.
- id: serial_dumpIP
  label: Serial Dump IP Config
  kind: query
  command: "dumpIP"
  notes: USB serial.
- id: eth_autoneg_enable
  label: Enable Ethernet Auto-Negotiation
  kind: action
  command: "ethautoneg=1"
  notes: USB serial. Reboot required.
- id: eth_autoneg_disable
  label: Disable Ethernet Auto-Negotiation
  kind: action
  command: "ethautoneg=0"
  notes: USB serial. Reboot required.
- id: raw_panel_mode_enable
  label: Enable Raw Panel Over USB Serial
  kind: action
  command: "serialRawPanel"
  notes: USB serial. Switches USB port into Raw Panel mode. Exit only via power cycle. Disables all other serial comms.
- id: factory_reset_button
  label: Factory Reset via Reset Button
  kind: action
  command: "Hold Reset button 10 seconds"
  notes: Hardware. Resets all settings including network.
- id: factory_reset_webui
  label: Factory Reset via Web UI
  kind: action
  command: "Network > Configuration Management > Restore Factory Defaults"
  notes: Web UI. Preserves network settings.
```

## Feedbacks
```yaml
- id: tally_state
  type: enum
  values: [on, off]
  notes: Returned by GET /tally/{color}/{channel} as JSON: {"tally": "green", "channel": 3, "state": true}.
- id: device_status_json
  type: object
  notes: Returned by getInfo serial command; structure not detailed in source.
- id: socket_status
  type: object
  notes: Returned by sockets serial command; structure not detailed in source.
```

## Variables
```yaml
- id: device_description
  type: string
  description: Custom device name up to 20 characters (set via Web UI).
- id: dhcp_enabled
  type: boolean
  description: Network setting (Web UI).
- id: static_ip
  type: string
  description: Manual IP when DHCP disabled (Web UI / serial ip= command).
- id: subnet_mask
  type: string
  description: Network setting; default 255.255.255.0.
- id: gateway
  type: string
  description: Network setting.
- id: web_password
  type: string
  description: Web UI password, up to 20 characters. Username fixed as "admin".
- id: allow_access_without_login
  type: boolean
  description: Advanced setting; when enabled, removes Web UI credential requirement.
- id: disable_mdns
  type: boolean
  description: Advanced setting; stops mDNS/Bonjour advertisements.
- id: eth_auto_negotiation
  type: enum
  values: [enabled, disabled]
  description: Network setting; toggleable via ethautoneg=1|0 (reboot required).
- id: raw_panel_enabled
  type: boolean
  description: Starts Raw Panel Server on TCP 9923, up to 3 simultaneous clients.
- id: raw_panel_allow_only_ip
  type: string
  description: Optional single-IP whitelist for Raw Panel connections.
- id: raw_panel_channel_labels
  type: array
  description: Up to 8 per-camera labels for Raw Panel tally identification.
- id: tsl_enabled
  type: boolean
  description: Enables TSL tally reception.
- id: tsl_listening_port
  type: integer
  description: UDP port for TSL; default 7001.
- id: tsl_mappings
  type: array
  description: Per-output TSL 3.1 (Address 0-126, Bit 0-3) and TSL 5.0 (Screen, Index, Bit) mappings.
- id: http_api_enabled
  type: boolean
  description: Enables REST-style HTTP tally API.
- id: direct_connection_enabled
  type: boolean
  description: Enables follow-mode for ATEM/vMix switchers (Devices tab).
- id: devices_switcher_type
  type: enum
  values: [ATEM, vMix]
  description: Switcher type to follow.
- id: devices_switcher_ip
  type: string
  description: Switcher IP address for Direct Connection.
- id: outputs_mapping
  type: array
  description: Per-output mapping (Bus + Camera/Input); Bus blank disables row. ATEM buses: Green Tally, Red Tally, Aux 1..40. vMix buses: Preview, Active, selected outputs. ATEM Camera 1..40; vMix Input 1..100.
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notification format.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step sequences beyond factory-reset / enable Raw Panel mode.
```

## Safety
```yaml
confirmation_required_for:
  - factory_reset
  - raw_panel_mode_enable  # disables all other serial comms; recovery only by power cycle
interlocks:
  - Direct Connection mode owns tally outputs and cannot be overridden by manual/TSL/Raw Panel until rows cleared or Direct Connection disabled.
notes: |
  Source warns: HTTP login credentials are transmitted unencrypted; use only on trusted
  local networks. Do not expose device directly to the internet without VPN/firewall.
  Source warns: embedding credentials in URLs (http://admin:password@ip) is insecure.
  Source warns: ATEM Constellation series can cause slower / intermittent connectivity; SKAARHOJ
  recommends Blue Pill products for these environments.
# UNRESOLVED: detailed electrical / fault-recovery procedures not stated in source.
```

## Notes
- TCP/9923 Raw Panel accepts up to 3 concurrent clients; mDNS advertises service.
- UDP/7001 default for TSL; can receive unicast or broadcast; broadcast affects multiple devices on subnet.
- Per-output HWCs (Raw Panel): HWC 1=Cam1 Red, 2=Cam1 Green, 3=Cam2 Red, 4=Cam2 Green, ..., 15=Cam8 Red, 16=Cam8 Green.
- Tally outputs support daisy-chaining; one connector can drive a lamp and pass signals to two additional lamps.
- Micro USB service port also used for firmware updates and manual IP setting.
- Save vs Save+Reboot in Web UI: some settings take effect immediately; IP/services/port changes need reboot.
- SKU "Eth Tally Link" not explicitly cross-referenced in source; assumed equivalent to / model of Tally Box platform "Link IO".

<!-- UNRESOLVED: TSL on-wire packet format not enumerated; Raw Panel wire-format beyond example commands not detailed; HTTP response schema beyond example not specified. -->

## Provenance

```yaml
source_domains:
  - pid.skaarhoj.com
  - skaarhoj.com
source_urls:
  - https://pid.skaarhoj.com/Manuals/SKAARHOJ_manual-ETH-TALLY-LINK-V3.pdf
  - https://www.skaarhoj.com/product/eth-tally-link
  - https://www.skaarhoj.com/raw-panel
retrieved_at: 2026-06-29T20:31:44.691Z
last_checked_at: 2026-06-30T07:12:12.473Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-30T07:12:12.473Z
matched_actions: 31
action_count: 31
confidence: medium
summary: "All 31 spec actions matched literally with verbatim source evidence; HTTP API, Raw Panel, and serial commands fully documented in source. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Tally Box / Eth Tally Link model disambiguation not explicit in source."
- "auth scheme on Raw Panel (TCP/9923) and TSL (UDP/7001) not separately specified in source."
- "source documents no unsolicited notification format."
- "source does not document multi-step sequences beyond factory-reset / enable Raw Panel mode."
- "detailed electrical / fault-recovery procedures not stated in source."
- "TSL on-wire packet format not enumerated; Raw Panel wire-format beyond example commands not detailed; HTTP response schema beyond example not specified."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
