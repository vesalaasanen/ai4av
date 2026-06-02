---
spec_id: admin/pesa-switching-systems-premiere-north-america
schema_version: ai4av-public-spec-v1
revision: 1
title: "Pesa Switching Systems P1 CPU Link Protocol (North America)"
manufacturer: "Pesa Switching Systems"
model_family: "2400E Controller"
aliases: []
compatible_with:
  manufacturers:
    - "Pesa Switching Systems"
  models:
    - "2400E Controller"
    - "3300 Controllers (EX, S, D, SE)"
    - "3500 Controllers (EX, S, D, SE)"
    - "3500Plus Controllers (EX, S, D, SE)"
    - "6600E/EX Controllers"
    - "Bobcat Control System"
    - "Ocelot Control System"
    - "LNS-8 Control System"
    - "PCI Interface for RC5000 Systems"
    - "RC5000 Controller"
    - "RC5500 Controller"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - broadcastrepo.com
source_urls:
  - "https://www.broadcastrepo.com/Manuals/Pesa/Control%20Systems/PESA%20CPULink%20Protocol%20No.%201%20(P1),%20Rev%20C.pdf"
retrieved_at: 2026-04-30T04:33:18.676Z
last_checked_at: 2026-06-02T04:20:09.175Z
generated_at: 2026-06-02T04:20:09.175Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "pin-out of the CPU port is controller-specific and not documented here"
  - "protocol extensions (P1E) for 3300/3500/3500Plus reserved commands are out of scope for this document"
  - "no explicit power on/off commands in source"
  - "no volume/gain/brightness commands in source"
  - "no continuous/parameterized settable variables documented; all routing state"
  - "source does not document unsolicited asynchronous notifications from the"
  - "no explicit multi-step command sequences documented in source."
  - "source does not document any safety warnings, interlock procedures, or"
  - "P1E (Protocol 1 with Extensions) reserved commands for 3300/3500/3500Plus are listed in the source as \"reserved\" and are beyond the scope of this document."
  - "Specific CPU port pin-out varies by controller; see equipment manual."
  - "Salvo data returned by B (Display Salvo) uses the same S DST L1 L2 L3 L4 line format; documented above as part of the change_salvo_entry action."
verification:
  verdict: verified
  checked_at: 2026-06-02T04:20:09.175Z
  matched_actions: 14
  action_count: 14
  confidence: medium
  summary: "All 14 spec actions matched literally to source commands B-Z; transport parameters (9600 baud, 8 data bits, no parity, 2 stop bits, RTS/CTS) verified. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Pesa Switching Systems P1 CPU Link Protocol (North America)

## Summary
This spec covers the CPU Link Protocol No. 1 (P1) used to control PESA Routing Switch Controllers over a serial link. It documents the RS-232 message formats, checksum, terminator, and the standard ASCII command set (B/C/D/F/H/J/L/P/R/T/V/W/Y/Z) for change-switch, status-query, salvo, lock, protect, and all-call operations. The same protocol is also supported over RS-422 on the Bobcat, LNS-8, Ocelot, 3300, 3500, and 3500Plus controllers, with a multi-drop address extension.

<!-- UNRESOLVED: pin-out of the CPU port is controller-specific and not documented here -->
<!-- UNRESOLVED: protocol extensions (P1E) for 3300/3500/3500Plus reserved commands are out of scope for this document -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 2
  flow_control: rts_cts
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# inferred from command set: switch commands (H, T, V), status queries (J, Y, Z), lock (L), protect (P)
- routable        # inferred: H/T/V perform matrix source-to-destination switches
- queryable       # inferred: J/Y/Z/W return matrix and lock state
- powerable       # UNRESOLVED: no explicit power on/off commands in source
- levelable       # UNRESOLVED: no volume/gain/brightness commands in source
```

## Actions
```yaml
# All commands are ASCII, terminated by CR+LF (Hex 0D 0A).
# Checksum (CS) is two ASCII characters computed from all preceding bytes per the
# Checksum Computation procedure in the source.
# SLV = 2-char salvo number (01-99, A0+ for 100+)
# DST = 3-char destination number (000-999, A00-J00 for 1000-1999)
# Lx  = 3-char level x source number (000-999, A00-J00 for 1000-1999)
# S   = optional 1-char switcher qualifier present on some commands
# @   = CR LF terminator

- id: display_salvo
  label: Display Salvo
  kind: query
  command: "B{SLV}{CS}@"
  params:
    - name: SLV
      type: string
      description: Salvo group number, 2 ASCII chars (01-99, A0-A9, B0-B9, ...)
  notes: "Returns G @ followed by one S DST L1 L2 L3 L4 line per salvo entry, then CS @. Not supported on RC5000, RC5500, 2400E, Ocelot, LNS-8, Bobcat."

- id: change_salvo_entry
  label: Change Salvo Entry
  kind: action
  command: "C{SLV}S{DST}{L1}{L2}{L3}{L4}{CS}@"
  params:
    - name: SLV
      type: string
      description: Salvo group number, 2 ASCII chars
    - name: DST
      type: string
      description: Destination number, 3 ASCII chars
    - name: L1
      type: string
      description: Level 1 source number, 3 ASCII chars
    - name: L2
      type: string
      description: Level 2 source number, 3 ASCII chars
    - name: L3
      type: string
      description: Level 3 source number, 3 ASCII chars
    - name: L4
      type: string
      description: Level 4 source number, 3 ASCII chars
  notes: "Length depends on number of configured switching levels. Not supported on RC5000, RC5500, 2400E, Ocelot, LNS-8, Bobcat."

- id: delete_salvo_entry
  label: Delete Salvo Entry
  kind: action
  command: "D{SLV}S{DST}{CS}@"
  params:
    - name: SLV
      type: string
      description: Salvo group number, 2 ASCII chars
    - name: DST
      type: string
      description: Destination number, 3 ASCII chars
  notes: "Not supported on RC5000, RC5500, 2400E, Ocelot, LNS-8, Bobcat."

- id: deallocate_salvo_group
  label: De-Allocate Salvo Group
  kind: action
  command: "F{SLV}{CS}@"
  params:
    - name: SLV
      type: string
      description: Salvo group number, 2 ASCII chars
  notes: "Removes entire salvo group from controller memory. Not supported on RC5000, RC5500, 2400E, Ocelot, LNS-8, Bobcat."

- id: change_switcher
  label: Change Switcher
  kind: action
  command: "H{DST}{L1}{L2}{L3}{L4}{CS}@"
  params:
    - name: DST
      type: string
      description: Destination number, 3 ASCII chars (000-999, A00-J00 for 1000-1999)
    - name: L1
      type: string
      description: Level 1 source number, 3 ASCII chars (use 000 or out-of-range for break-away)
    - name: L2
      type: string
      description: Level 2 source number, 3 ASCII chars
    - name: L3
      type: string
      description: Level 3 source number, 3 ASCII chars
    - name: L4
      type: string
      description: Level 4 source number, 3 ASCII chars
  notes: "Length depends on number of configured switching levels; all configured levels MUST be specified. 6600E/EX <V2.20 does not support break-away. RC5000/RC5500 returns lock indication if any output in destination group is locked."

- id: display_switcher_status_no_error
  label: Display Switcher Status (No Error Info)
  kind: query
  command: "J{CS}@"
  params: []
  notes: "Returns L1 L2 L3 L4 lines, one per destination, then CS @. 3300 and 3500 reject requests where response would exceed 2KB and return N @."

- id: change_lock
  label: Change Lock
  kind: action
  command: "L{S}{DST}{CS}@"
  params:
    - name: S
      type: string
      description: Switcher qualifier letter (1 char)
    - name: DST
      type: string
      description: Destination number, 3 ASCII chars
  notes: "Toggles lock status of destination. Protect response (P @) used only by 3300 and 3500."

- id: change_protect
  label: Change Protect
  kind: action
  command: "P{S}{DST}{CS}@"
  params:
    - name: S
      type: string
      description: Switcher qualifier letter (1 char)
    - name: DST
      type: string
      description: Destination number, 3 ASCII chars
  notes: "Not supported by 6600E/EX, RC5000, PCI-5000, Ocelot, LNS-8, Bobcat, and RC5500. Protect response used only by 3300, 3500, 3500Plus."

- id: restore_from_all_call
  label: Restore System From All Call
  kind: action
  command: "R{CS}@"
  params: []
  notes: "Not supported on RC5000, RC5500, Ocelot, LNS-8, Bobcat."

- id: all_call
  label: All Call
  kind: action
  command: "T{L1}{L2}{L3}{L4}{CS}@"
  params:
    - name: L1
      type: string
      description: Level 1 source number, 3 ASCII chars
    - name: L2
      type: string
      description: Level 2 source number, 3 ASCII chars
    - name: L3
      type: string
      description: Level 3 source number, 3 ASCII chars
    - name: L4
      type: string
      description: Level 4 source number, 3 ASCII chars
  notes: "Switches all destinations to specified sources. Length depends on configured switching levels. Not supported on RC5000, RC5500, Ocelot, LNS-8, Bobcat."

- id: transmit_salvo_group
  label: Transmit Salvo Group
  kind: action
  command: "V{SLV}{CS}@"
  params:
    - name: SLV
      type: string
      description: Salvo group number, 2 ASCII chars
  notes: "Fires a previously loaded salvo. Not supported on RC5000, RC5500, 2400E, Ocelot, LNS-8, Bobcat."

- id: display_lock_status
  label: Display Lock Status
  kind: query
  command: "W{S}{CS}@"
  params:
    - name: S
      type: string
      description: Optional switcher qualifier (1 char); S is optional and may be omitted
  notes: "Returns one byte per destination: 0=unlocked, 1=locked, 2=protected, then CS @. The S portion is optional; command may be sent as W{CS}@."

- id: send_switcher_status_single
  label: Send Switcher Status (Single Destination)
  kind: query
  command: "Y{DST}{CS}@"
  params:
    - name: DST
      type: string
      description: Destination number, 3 ASCII chars
  notes: "Returns DST STAT L1 L2 L3 L4 CS @. STAT field contains readback/confidence error indicators (2 ASCII chars 0x30-0x3F per level pair). Minimum of 4 levels returned in STAT."

- id: send_switcher_status_all
  label: Send Switcher Status (Entire Matrix)
  kind: query
  command: "Z{CS}@"
  params: []
  notes: "Returns DST STAT L1 L2 L3 L4 per destination, then CS @. STAT field per level pair. 3300 and 3500 reject if response would exceed 2KB. Not supported on RC5000, RC5500, 2400E, Ocelot, LNS-8, Bobcat."
```

## Feedbacks
```yaml
# Reply responses - single-character acknowledgments returned by the controller.
# These appear as the first byte of every response (E @, G @, L @, N @, P @).
- id: transmission_error
  type: enum
  values: [error]
  notes: "ASCII 'E' response: transmission error or invalid input format."
- id: good_transmission
  type: enum
  values: [ok]
  notes: "ASCII 'G' response: command accepted and performed."
- id: locked_destination
  type: enum
  values: [locked]
  notes: "ASCII 'L' response: destination was locked by an equal or higher priority device."
- id: function_not_allowed
  type: enum
  values: [rejected]
  notes: "ASCII 'N' response: requested function not allowed, equipment malfunction, or invalid destination number / format error."
- id: protected_destination
  type: enum
  values: [protected]
  notes: "ASCII 'P' response: destination was protected by an equal or higher priority device."

# Display Lock Status payload (W command) - per-destination lock byte
- id: lock_status_per_destination
  type: enum
  values: [unlocked, locked, protected]
  notes: "Per-destination status byte in W command response: 0=unlocked, 1=locked, 2=protected."

# STAT field - readback/confidence error indicators
- id: crosspoint_error_status
  type: enum
  values: [no_error, not_defined, readback_error, confidence_error]
  notes: "Per-level status in Y and Z responses. 2-bit field per level, packed two levels per ASCII char (0x30-0x3F). 00=No Error, 01=Not Defined, 10=Readback Error, 11=Confidence Error."
```

## Variables
```yaml
# UNRESOLVED: no continuous/parameterized settable variables documented; all routing state
# is set via discrete change commands. Section retained for spec completeness.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited asynchronous notifications from the
# controller. All data transfers are master/slave in response to commands.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step command sequences documented in source.
# Salvo groups (V command) provide a controller-side grouping mechanism but their
# contents are user-defined, not documented here.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document any safety warnings, interlock procedures, or
# power-on sequencing requirements specific to the CPU link. The DSR input on 3300/3500/
# 3500Plus must be asserted to keep the CPU link port active; removal resets the port
# mechanism, but this is operational rather than a safety interlock.
```

## Notes
**Message format.** All CPU link messages are 7-bit ASCII with the MSB set to 0. Format: `Command [<Data>] Checksum Terminator`. Terminator is CR+LF (Hex 0D 0A). The 6600E/EX V2.30+ allows dropping CR; 3300 V3.0+ and 3500/3500Plus allow CR-only, LF-only, or CR+LF.

**Checksum.** Two ASCII characters computed from the sum of decimal ASCII codes of all preceding bytes: mask to 8 bits, split into upper/lower nibbles, add 48 (ASCII '0') to each nibble. Example: `H 0 0 1 0 0 5` sums to 366; 366 mod 256 = 110; 110 / 16 = 6 remainder 14; checksum = `6>` (ASCII 54, 62). 3300 V3.0+ and all 3500/3500Plus releases also accept a standard hexadecimal checksum or checksum omission.

**Source/destination numbering.** Numbers 0-999 use three ASCII decimal digits. Numbers 1000-1999 use `A00`-`J00` mapped to 1000-1999 (one letter for the 1000s digit, two digits for the remainder). The value 0 is a NULL identifier (no action); only 6600E/EX allows 0 as a silent source.

**Salvo numbering.** Numbers 1-99 use two ASCII decimal digits `01`-`99`. Salvos 100+ use `A0`-`A9`, `B0`-`B9`, `C0`-`C9`, etc., as needed.

**Status field (STAT).** Returned by Y and Z commands. Two ASCII characters in the range 0x30-0x3F per level pair. Lower 4 bits of each char encode 2 levels (2 bits each: 00=No Error, 01=Not Defined, 10=Readback Error, 11=Confidence Error). Minimum of 4 levels returned. 2400E does not support Readback errors; Bobcat/LNS-8/Ocelot do not support Readback or Confidence errors.

**Switch timing.** After a change-switcher (H) command, the actual switch may not occur until the next vertical interval of the video signal. 6600E/RC5000/RC5500/PCI5000: wait at least 32 ms before requesting status. Other controllers send back desired status; readback errors are reported in the status response.

**Flow control.** RS-232: RTS/CTS handshake. Computer controls CTS to gate controller-to-computer data; controller drives RTS to gate computer-to-controller data. Must be able to receive at least 3 characters after CTS goes low; CTS must not float. 3300/3500/3500Plus also require DSR asserted (active) — removing DSR resets the CPU link port. Bobcat/LNS-8/Ocelot do not implement flow control; host must accept uncontrolled output. RS-422 multi-drop disables flow control entirely.

**RS-422 multi-drop (Bobcat, LNS-8, Ocelot).** Message format extends to `ControllerID Command [<Data>] Checksum, Terminator` where ControllerID is a decimal ASCII address. Only the addressed controller acts on a command and only it responds. RS-422 transmitter is tri-stated between transmissions; host must bias the bus. Multi-drop controllers do not respond to communications errors (no `E @` response on error).

**Status response limits.** J and Z commands: 3300 and 3500 controllers reject requests when the response would exceed 2 KB and return `N @`.

<!-- UNRESOLVED: P1E (Protocol 1 with Extensions) reserved commands for 3300/3500/3500Plus are listed in the source as "reserved" and are beyond the scope of this document. -->
<!-- UNRESOLVED: Specific CPU port pin-out varies by controller; see equipment manual. -->
<!-- UNRESOLVED: Salvo data returned by B (Display Salvo) uses the same S DST L1 L2 L3 L4 line format; documented above as part of the change_salvo_entry action. -->

## Provenance

```yaml
source_domains:
  - broadcastrepo.com
source_urls:
  - "https://www.broadcastrepo.com/Manuals/Pesa/Control%20Systems/PESA%20CPULink%20Protocol%20No.%201%20(P1),%20Rev%20C.pdf"
retrieved_at: 2026-04-30T04:33:18.676Z
last_checked_at: 2026-06-02T04:20:09.175Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T04:20:09.175Z
matched_actions: 14
action_count: 14
confidence: medium
summary: "All 14 spec actions matched literally to source commands B-Z; transport parameters (9600 baud, 8 data bits, no parity, 2 stop bits, RTS/CTS) verified. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "pin-out of the CPU port is controller-specific and not documented here"
- "protocol extensions (P1E) for 3300/3500/3500Plus reserved commands are out of scope for this document"
- "no explicit power on/off commands in source"
- "no volume/gain/brightness commands in source"
- "no continuous/parameterized settable variables documented; all routing state"
- "source does not document unsolicited asynchronous notifications from the"
- "no explicit multi-step command sequences documented in source."
- "source does not document any safety warnings, interlock procedures, or"
- "P1E (Protocol 1 with Extensions) reserved commands for 3300/3500/3500Plus are listed in the source as \"reserved\" and are beyond the scope of this document."
- "Specific CPU port pin-out varies by controller; see equipment manual."
- "Salvo data returned by B (Display Salvo) uses the same S DST L1 L2 L3 L4 line format; documented above as part of the change_salvo_entry action."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
